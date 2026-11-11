import { P } from "@/lib/sample";
import Notifications from "@/components/views/Notifications";

export const metadata = { title: `${P["notifications"].t} – Good Hands Admin` };

export default function Page() {
  return <Notifications />;
}
