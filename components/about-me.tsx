import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export default function AboutMe() {
  return (
    <div className="flex flex-col gap-4 text-white/80">
      <h2
        className="uppercase leading-none"
        style={{
          fontFamily: bebas.style.fontFamily,
          fontSize: "clamp(2rem, 5vw, 3rem)",
          color: "#FF2D6E",
          letterSpacing: "0.05em",
        }}
      >
        WHAT IS THIS
      </h2>

      <div className="w-16 h-1 bg-[#FF2D6E]/40" />

      <p className="text-sm leading-relaxed text-justify">
        While I believe that more tournaments should be{" "}
        <span className="text-[#FF2D6E] font-semibold">OPEN</span>, there is
        clear interest towards{" "}
        <span className="text-[#FF2D6E] font-semibold">ROOKIE TOURNAMENTS</span>
        , which were originally meant for newcomers who just joined our community
        and wanted to try competing. In reality, however, they are being used to
        farm prize money, exploiting the fact that you are mostly fighting
        people who have just started playing the game. This is caused by the
        lack of a single source of truth for the banlist. This project aims to
        fix that, and I sincerely hope that{" "}
        <span className="text-[#FF2D6E] font-semibold">ROOKIE TOURNAMENT</span>{" "}
        organizers will utilize it.
      </p>

      <div className="flex flex-col gap-3">
        <h3
          className="uppercase text-xs tracking-widest font-semibold"
          style={{ color: "#FF2D6E" }}
        >
          Banning Criteria
        </h3>
        <p className="text-sm leading-relaxed text-justify">
          <span className="text-[#FF2D6E] font-semibold">ROOKIE TOURNAMENTS</span>{" "}
          are meant for absolute newcomers. Players who have reached{" "}
          <span className="text-[#FF2D6E] font-semibold">God of Destruction</span>{" "}
          or above should not be participating, nor should anyone who has been
          consistently placing high in{" "}
          <span className="text-[#FF2D6E] font-semibold">OPEN TOURNAMENTS</span>.
        </p>
        <ul className="flex flex-col gap-1.5 text-sm text-white/70 mt-1">
          {[
            "Has ever reached God of Destruction rank",
            "Consistently finishing Top 8 in Open Tournaments",
            "Has previously finished top 3 in a Rookie Tournament",
            "Flagged by community input",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-[#FF2D6E] mt-0.5 shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed text-justify">
          When you submit a request, it will go through a review process where
          we research with the community whether the player truly belongs on the
          banlist. Please provide ample evidence with your submission.
        </p>
      </div>

      <div className="mt-2 flex flex-col gap-1 text-xs text-white/50 uppercase tracking-widest">
        <span>Contact: @lounarisnia on Discord</span>
      </div>
    </div>
  );
}
