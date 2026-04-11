import { Bebas_Neue } from "next/font/google";
import { loadBanlist } from "@/lib/banlist";
import WaveBackground from "@/components/wave-background";
import Banlist from "@/components/banlist";
import Link from "next/link";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default async function Home() {
  const banlist = await loadBanlist();

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center"
      style={{ backgroundColor: "#141414" }}
    >
      <WaveBackground />

      <div className="relative z-10 w-full max-w-4xl px-8 py-16 flex flex-col gap-4">
        <div className="text-center mb-4">
          <h1
            className="uppercase leading-none"
            style={{
              fontFamily: bebas.style.fontFamily,
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              color: "#FF2D6E",
              letterSpacing: "0.05em",
            }}
          >
            INDO TEKKEN ROOKIE BANLIST
          </h1>
          <p className="italic text-lg mt-1" style={{ color: "#FF2D6E" }}>
            You are hereby banned from farming money at a rookie tournament
          </p>
        </div>

        <Banlist names={banlist} />

        <Link
          href="/submit"
          className="w-full py-4 border-2 border-[#FF2D6E] text-[#FF2D6E] uppercase tracking-widest font-bold text-base text-center hover:bg-[#FF2D6E] hover:text-[#141414] transition-colors"
        >
          BANLIST SUBMISSION FORM
        </Link>

        <p className="text-center text-sm" style={{ color: "#888888" }}>
          This list is community maintained. If you see anyone missing or who
          should not be on this list, please use the banlist submission form
          above to submit a request for us to review.
        </p>
      </div>
    </div>
  );
}
