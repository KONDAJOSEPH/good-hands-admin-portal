import { P } from "@/lib/sample";
import DataPage from "@/components/DataPage";

export const metadata = { title: `${P["patients"].t} – Good Hands Admin` };

export default function Page() {
  return <DataPage id="patients" />;
}
