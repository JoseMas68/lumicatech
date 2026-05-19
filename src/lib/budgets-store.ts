import fs from "fs";
import path from "path";

export type BudgetStatus = "borrador" | "enviado" | "aceptado" | "rechazado" | "vencido";

export interface BudgetItem {
	id: string;
	concept: string;
	description?: string;
	quantity: number;
	unitPrice: number;
	total: number;
}

export interface StoredBudget {
	id: string;
	token: string;
	bookingId?: string;
	clientName: string;
	clientEmail: string;
	company?: string;
	title: string;
	notes?: string;
	currency: string;
	taxPercent: number;
	discount: number;
	subtotal: number;
	taxAmount: number;
	finalTotal: number;
	items: BudgetItem[];
	status: BudgetStatus;
	validUntil?: string;
	createdAt: string;
	updatedAt?: string;
	lastSentAt?: string;
	respondedAt?: string;
	responseNotes?: string;
}

type BudgetInput = Omit<StoredBudget, "id" | "token" | "subtotal" | "taxAmount" | "finalTotal" | "status" | "createdAt" | "updatedAt">;
type BudgetUpdate = Partial<Omit<BudgetInput, "items">> & { items?: Array<Partial<BudgetItem>> };

interface BudgetsData {
	budgets: StoredBudget[];
}

const BUDGETS_PATH = path.join(process.cwd(), "data", "budgets.json");
const ALLOWED_CURRENCIES = ["EUR", "USD", "GBP", "CHF"];

function readBudgets(): BudgetsData {
	try {
		if (fs.existsSync(BUDGETS_PATH)) {
			return JSON.parse(fs.readFileSync(BUDGETS_PATH, "utf-8")) as BudgetsData;
		}
	} catch {
		// Si falla lectura, devolvemos una estructura vacia.
	}
	return { budgets: [] };
}

function writeBudgets(data: BudgetsData): void {
	const dir = path.dirname(BUDGETS_PATH);
	if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
	fs.writeFileSync(BUDGETS_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function generateId(prefix: string): string {
	return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function toMoney(n: number): number {
	return Math.round((n + Number.EPSILON) * 100) / 100;
}

function normalizeCurrency(currency?: string): string {
	const candidate = String(currency || "EUR").toUpperCase();
	return ALLOWED_CURRENCIES.includes(candidate) ? candidate : "EUR";
}

function normalizeItems(items: Array<Partial<BudgetItem>>): BudgetItem[] {
	return items
		.filter((item) => !!item.concept)
		.map((item) => {
			const quantity = Math.max(0, Number(item.quantity || 0));
			const unitPrice = Math.max(0, Number(item.unitPrice || 0));
			return {
				id: item.id || generateId("item"),
				concept: String(item.concept).trim(),
				description: item.description?.trim() || undefined,
				quantity,
				unitPrice,
				total: toMoney(quantity * unitPrice),
			};
		});
}

function calculateTotals(items: BudgetItem[], taxPercent: number, discount: number) {
	const subtotal = toMoney(items.reduce((acc, item) => acc + item.total, 0));
	const safeDiscount = Math.min(Math.max(0, discount), subtotal);
	const taxableBase = Math.max(0, subtotal - safeDiscount);
	const taxAmount = toMoney(taxableBase * Math.max(0, taxPercent) / 100);
	const finalTotal = toMoney(taxableBase + taxAmount);
	return { subtotal, taxAmount, finalTotal, discount: safeDiscount };
}

export function getAllBudgets(): StoredBudget[] {
	return readBudgets().budgets;
}

export function getBudgetById(id: string): StoredBudget | null {
	return readBudgets().budgets.find((b) => b.id === id) || null;
}

export function getBudgetByToken(token: string): StoredBudget | null {
	return readBudgets().budgets.find((b) => b.token === token) || null;
}

export function createBudget(input: BudgetInput): StoredBudget {
	const data = readBudgets();
	const items = normalizeItems(input.items);
	if (items.length === 0) {
		throw new Error("El presupuesto debe contener al menos un item valido");
	}
	const totals = calculateTotals(items, input.taxPercent || 0, input.discount || 0);
	const budget: StoredBudget = {
		...input,
		id: generateId("budget"),
		token: generateId("budgettok"),
		status: "borrador",
		currency: normalizeCurrency(input.currency),
		taxPercent: Math.max(0, Number(input.taxPercent || 0)),
		discount: totals.discount,
		items,
		subtotal: totals.subtotal,
		taxAmount: totals.taxAmount,
		finalTotal: totals.finalTotal,
		createdAt: new Date().toISOString(),
	};
	data.budgets.push(budget);
	writeBudgets(data);
	return budget;
}

export function updateBudget(id: string, fields: BudgetUpdate): StoredBudget | null {
	const data = readBudgets();
	const budget = data.budgets.find((b) => b.id === id);
	if (!budget) return null;

	if (fields.items) {
		const normalized = normalizeItems(fields.items);
		if (normalized.length === 0) {
			throw new Error("El presupuesto debe contener al menos un item valido");
		}
		budget.items = normalized;
	}
	if (fields.clientName !== undefined) budget.clientName = fields.clientName.trim();
	if (fields.clientEmail !== undefined) budget.clientEmail = fields.clientEmail.trim().toLowerCase();
	if (fields.company !== undefined) budget.company = fields.company?.trim() || undefined;
	if (fields.title !== undefined) budget.title = fields.title.trim();
	if (fields.notes !== undefined) budget.notes = fields.notes?.trim() || undefined;
	if (fields.currency !== undefined) budget.currency = normalizeCurrency(fields.currency);
	if (fields.taxPercent !== undefined) budget.taxPercent = Math.max(0, Number(fields.taxPercent));
	if (fields.discount !== undefined) budget.discount = Math.max(0, Number(fields.discount));
	if (fields.validUntil !== undefined) budget.validUntil = fields.validUntil || undefined;

	const totals = calculateTotals(budget.items, budget.taxPercent, budget.discount);
	budget.discount = totals.discount;
	budget.subtotal = totals.subtotal;
	budget.taxAmount = totals.taxAmount;
	budget.finalTotal = totals.finalTotal;
	budget.updatedAt = new Date().toISOString();
	writeBudgets(data);
	return budget;
}

export function setBudgetStatus(id: string, status: BudgetStatus): StoredBudget | null {
	const data = readBudgets();
	const budget = data.budgets.find((b) => b.id === id);
	if (!budget) return null;
	budget.status = status;
	if (status === "enviado") budget.lastSentAt = new Date().toISOString();
	budget.updatedAt = new Date().toISOString();
	writeBudgets(data);
	return budget;
}

export function deleteBudget(id: string): boolean {
	const data = readBudgets();
	const before = data.budgets.length;
	data.budgets = data.budgets.filter((b) => b.id !== id);
	if (data.budgets.length === before) return false;
	writeBudgets(data);
	return true;
}

export function duplicateBudget(id: string): StoredBudget | null {
	const source = getBudgetById(id);
	if (!source) return null;
	return createBudget({
		bookingId: source.bookingId,
		clientName: source.clientName,
		clientEmail: source.clientEmail,
		company: source.company,
		title: `${source.title} (copia)`,
		notes: source.notes,
		currency: source.currency,
		taxPercent: source.taxPercent,
		discount: source.discount,
		items: source.items,
		validUntil: source.validUntil,
		lastSentAt: undefined,
		respondedAt: undefined,
		responseNotes: undefined,
	});
}

export function respondBudgetByToken(token: string, decision: "aceptado" | "rechazado", notes?: string): StoredBudget | null {
	const data = readBudgets();
	const budget = data.budgets.find((b) => b.token === token);
	if (!budget) return null;
	if (budget.respondedAt) {
		throw new Error("Presupuesto ya respondido");
	}
	if (budget.status !== "enviado") {
		throw new Error("El presupuesto no esta pendiente de respuesta");
	}
	if (budget.validUntil && new Date(budget.validUntil).getTime() < Date.now()) {
		throw new Error("El presupuesto ha vencido");
	}
	budget.status = decision;
	budget.respondedAt = new Date().toISOString();
	budget.responseNotes = notes?.trim() || undefined;
	budget.updatedAt = new Date().toISOString();
	writeBudgets(data);
	return budget;
}
