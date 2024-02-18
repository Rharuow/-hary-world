import { BuildAnimation } from "@/components/buildAnimation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import t from "@/i18n.json";

export default function Dashboard() {
  const session = cookies().get("session");

  if (!session) return redirect("/");

  return (
    <div className="translate-y-full flex flex-col gap-6">
      <BuildAnimation />
      <p className="text-foreground text-center">
        {t["pt-BR"].general["We are building this page"]}
      </p>
    </div>
  );
}
