import { BuildAnimation } from "@/components/buildAnimation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const session = cookies().get("session");

  if (!session) return redirect("/");

  return (
    <div className="translate-y-full flex flex-col gap-6">
      <BuildAnimation />
      <p className="text-foreground text-center">
        Estamos construindo essa página
      </p>
    </div>
  );
}
