import { Bebas_Neue } from "next/font/google";
import WaveBackground from "@/components/wave-background";
import SubmitForm from "@/components/submit-form";
import Link from "next/link";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export default function SubmitPage() {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center"
      style={{ backgroundColor: "#141414" }}
    >
      <WaveBackground />

      <div className="relative z-10 w-full max-w-2xl px-8 py-16 flex flex-col gap-6">
        <div className="text-center mb-2">
          <h1
            className="uppercase leading-none"
            style={{
              fontFamily: bebas.style.fontFamily,
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              color: "#FF2D6E",
              letterSpacing: "0.05em",
            }}
          >
            Submit a Ban
          </h1>
          <p className="italic text-base mt-1" style={{ color: "#FF2D6E" }}>
            All submissions are reviewed before being added to the banlist
          </p>
        </div>

        <SubmitForm />

        <Link
          href="/"
          className="text-center text-sm text-[#FF2D6E]/60 hover:text-[#FF2D6E] transition-colors uppercase tracking-widest"
        >
          ← Back to banlist
        </Link>
      </div>
    </div>
  );
}
