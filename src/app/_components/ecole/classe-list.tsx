"use client";
import { api } from "@/trpc/react";

export function ClasseTable() {
  const [classes] = api.classe.getAll.useSuspenseQuery();

  return (
    <div className="w-full max-w-lg">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nom</th>
            <th className="border px-4 py-2">Slug</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classe) => (
            <tr key={classe.id}>
              <td className="border px-4 py-2">{classe.name}</td>
              <td className="border px-4 py-2">{classe.slug}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
