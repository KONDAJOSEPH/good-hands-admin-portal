import { P } from "@/lib/sample";
import Dashboard from "@/components/views/Dashboard";

export const metadata = { title: `${P["dashboard"].t} – Good Hands Admin` };

export default function Page() {
  return <Dashboard />;
}
