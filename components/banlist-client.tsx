"use client";
import { useState } from "react";

export default function BanlistClient({ names }: { names: string[] }) {
  const [query, setQuery] = useState("");
  const filtered = query
    ? names.filter((n) => n.toLowerCase().includes(query.toLowerCase()))
    : names;

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-xl px-5 py-4 text-base bg-white text-gray-900 placeholder-gray-400 outline-none mb-3"
      />
      <div className="w-full rounded-xl bg-[#f5f5f0] p-6 min-h-[540px]">
        {filtered.length === 0 ? (
          <p className="text-gray-400 italic text-center mt-10 text-sm">
            No banned players found.
          </p>
        ) : (
          <ul>
            {filtered.map((name, i) => (
              <li
                key={i}
                className="border-b border-gray-200 py-3 px-1 text-gray-800 font-medium last:border-0"
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
