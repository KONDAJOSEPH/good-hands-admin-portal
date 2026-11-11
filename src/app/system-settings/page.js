import { P } from "@/lib/sample";
import SystemSettings from "@/components/views/SystemSettings";

export const metadata = { title: `${P["system-settings"].t} – Good Hands Admin` };

export default function Page() {
  return <SystemSettings />;
}
