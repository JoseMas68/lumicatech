import { getAvailabilityConfig } from "@/src/lib/availability-config";
import DashboardClient from "./components/DashboardClient";

export default function DashboardPage() {
  const config = getAvailabilityConfig();
  return <DashboardClient initialConfig={config} />;
}
