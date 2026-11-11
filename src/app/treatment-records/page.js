import { P } from "@/lib/sample";
import DataPage from "@/components/DataPage";

export const metadata = { title: `${P["treatment-records"].t} – Good Hands Admin` };

export default function Page() {
  return <DataPage id="treatment-records" />;
}
