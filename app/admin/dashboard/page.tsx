import { getAvailabilityConfig } from "@/src/lib/availability-config";
import DashboardClient from "./components/DashboardClient";

export default async function DashboardPage() {
  const config = await getAvailabilityConfig();
  return <DashboardClient initialConfig={config} />;
}
