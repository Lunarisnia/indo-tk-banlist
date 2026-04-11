"use client";
import { useState, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export default function Banlist({ names }: { names: string[] }) {
  const [query, setQuery] = useState("");
  const filtered = query
    ? names.filter((n) => n.toLowerCase().includes(query.toLowerCase()))
    : names;

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
    gap: 8,
  });

  return (
    <>
      <input
        type="text"
        placeholder="Enter your name here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-4 text-base bg-transparent text-[#FF2D6E] placeholder-[#FF2D6E] border-2 border-[#FF2D6E] outline-none mb-3"
      />
      {query && filtered.length === 0 && (
        <div className="w-full border-2 border-[#FF2D6E] py-16 px-4 mb-3 text-[#FF2D6E] font-medium text-center">
          <span className="block font-bold text-[30px]">CONGRATULATIONS!</span>
          <span className="block font-normal italic">You are not banned from any rookie tournament.</span>
        </div>
      )}
      <div
        ref={parentRef}
        className="w-full overflow-auto min-h-[540px] max-h-[540px] [scrollbar-color:#FF2D6E_#141414] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#141414] [&::-webkit-scrollbar-thumb]:bg-[#FF2D6E]"
      >
        <ul
          style={{ height: virtualizer.getTotalSize(), position: "relative" }}
        >
          {virtualizer.getVirtualItems().map((item) => (
            <li
              key={item.key}
              data-index={item.index}
              ref={virtualizer.measureElement}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", transform: `translateY(${item.start}px)` }}
              className="border-2 border-[#FF2D6E] py-3 px-4 text-[#FF2D6E] font-medium break-words"
            >
              {filtered[item.index]}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
