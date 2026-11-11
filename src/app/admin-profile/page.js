import { P } from "@/lib/sample";
import AdminProfile from "@/components/views/AdminProfile";

export const metadata = { title: `${P["admin-profile"].t} – Good Hands Admin` };

export default function Page() {
  return <AdminProfile />;
}
