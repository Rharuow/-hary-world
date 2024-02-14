import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const session = cookies().get("session");

  if (!session) return redirect("/");

  return <div>DASHBOARD</div>;
}
