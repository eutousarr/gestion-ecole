"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function ClasseList() {
  const [latestClasse] = api.classe.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createClasse = api.classe.create.useMutation({
    onSuccess: async () => {
      await utils.classe.invalidate();
      setName("");
    },
  });

  return (
    <div className="w-full max-w-lg">
      {latestClasse ? (
        <p className="truncate">Your most recent classe: {latestClasse.name} - {latestClasse.slug}</p>
      ) : (
        <p>You have no classe yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createClasse.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Prénom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createClasse.isPending}
        >
          {createClasse.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
