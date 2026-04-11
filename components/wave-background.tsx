export default function WaveBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="wavy-filter" x="-5%" y="-5%" width="200%" height="210%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.010 0.006"
            numOctaves="3"
            seed="299"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              values="0.010 0.006;0.013 0.008;0.009 0.005;0.012 0.007;0.010 0.006"
              dur="240s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="100"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <pattern
          id="zebra-stripes"
          x="0"
          y="0"
          width="2000"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <rect width="2000" height="28" fill="#1c1c1c" />
          <rect width="2000" height="11" fill="#0a0a0a" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#zebra-stripes)"
        filter="url(#wavy-filter)"
      />
    </svg>
  );
}
