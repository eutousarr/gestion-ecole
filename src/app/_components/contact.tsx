"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function LatestContact() {
  const [latestContact] = api.contact.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [description, setDescription] = useState("");
  const createContact = api.contact.create.useMutation({
    onSuccess: async () => {
      await utils.contact.invalidate();
      setPrenom("");
      setNom("");
      setEmail("");
      setPhone("");
      setAdresse("");
      setDescription("");
    },
  });

  return (
    <div className="w-full max-w-lg">
      {latestContact ? (
        <p className="truncate">Your most recent contact: {latestContact.prenom} {latestContact.nom} - {latestContact.email}</p>
      ) : (
        <p>You have no contacts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createContact.mutate({ prenom, nom, email, phone, adresse, description });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createContact.isPending}
        >
          {createContact.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
