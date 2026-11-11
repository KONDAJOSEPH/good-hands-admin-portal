import { P } from "@/lib/sample";
import Reports from "@/components/views/Reports";

export const metadata = { title: `${P["reports"].t} – Good Hands Admin` };

export default function Page() {
  return <Reports />;
}
