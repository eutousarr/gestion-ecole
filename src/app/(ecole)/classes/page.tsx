import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

import { ClasseList } from "@/app/_components/ecole/classe";
import Link from "next/link";
import { ClasseTable } from "@/app/_components/ecole/classe-list";
export default async function ClassesRoute() {
  const session = await auth();

  if (session?.user) {
    void api.classe.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-[3rem]">
            Gestion des{" "}
            <span className="text-[hsl(280,100%,70%)]">Classes</span>
          </h1>

          <div className="flex flex-col items-center gap-2">
            <p>
              {session && <span>Logged in as {session.user?.name} ({session.user?.role})</span>}
            </p>
            

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {
                  session?.user?.role === "admin" || session?.user?.role === "enseignant" && (
                    <span>Vous êtes un <b>({session.user?.role})</b> et pouvez accéder aux données de cette page</span>
                  )

                }
              {session?.user.role === "user" && (
                <span>Vous êtes un <b>USER SIMPLE</b> et ne pouvez accéder aux données de cette page</span>
              )}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>

          {session?.user?.role === "admin" && <ClasseList />}
          {(session?.user?.role === "enseignant" || session?.user?.role === "admin") && <ClasseTable />}

          
        </div>
      </main>
    </HydrateClient>
  );
}
