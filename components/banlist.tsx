"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export default function Banlist({ names }: { names: string[] }) {
  const [query, setQuery] = useState("");
  const filtered = query
    ? names.filter((n) => n.toLowerCase().includes(query.toLowerCase()))
    : names;

  const parentRef = useRef<HTMLDivElement>(null);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [showThumb, setShowThumb] = useState(false);

  const updateThumb = useCallback(() => {
    const el = parentRef.current;
    if (!el) return;
    const ratio = el.clientHeight / el.scrollHeight;
    setShowThumb(ratio < 1);
    setThumbHeight(ratio * el.clientHeight);
    setThumbTop((el.scrollTop / el.scrollHeight) * el.clientHeight);
  }, []);

  useEffect(() => {
    updateThumb();
  }, [filtered.length, updateThumb]);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateThumb);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateThumb]);

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
        placeholder="Search your name here"
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
      <div className="relative w-full">
        <div
          ref={parentRef}
          onScroll={updateThumb}
          className="w-full overflow-y-scroll max-h-[540px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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

        {showThumb && (
          <div className="absolute right-0 top-0 bottom-0 w-1.5 pointer-events-none">
            <div
              className="absolute w-full bg-[#FF2D6E]"
              style={{ height: thumbHeight, top: thumbTop }}
            />
          </div>
        )}
      </div>
    </>
  );
}
