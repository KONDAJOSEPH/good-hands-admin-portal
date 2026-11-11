import { P } from "@/lib/sample";
import DataPage from "@/components/DataPage";

export const metadata = { title: `${P["audit-logs"].t} – Good Hands Admin` };

export default function Page() {
  return <DataPage id="audit-logs" />;
}
