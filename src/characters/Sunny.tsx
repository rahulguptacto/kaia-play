interface Props {
  size?: number;
}

export default function Sunny({ size = 115 }: Props) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      {/* Glow */}
      <circle cx="100" cy="100" r="70" fill="url(#sG)" opacity=".25">
        <animate
          attributeName="r"
          values="62;72;62"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <defs>
        <radialGradient id="sG">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Star body (outer) */}
      <polygon
        points="100,20 118,72 175,72 128,108 145,162 100,132 55,162 72,108 25,72 82,72"
        fill="#FFD700"
        stroke="#FFA500"
        strokeWidth="2"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 100 100;5 100 100;0 100 100;-5 100 100;0 100 100"
          dur="3s"
          repeatCount="indefinite"
        />
      </polygon>
      {/* Star body (inner) */}
      <polygon
        points="100,40 113,78 155,78 120,104 133,148 100,125 67,148 80,104 45,78 87,78"
        fill="#FFEC8B"
      />
      {/* Eyes */}
      <circle cx="86" cy="88" r="6" fill="#333" />
      <circle cx="114" cy="88" r="6" fill="#333" />
      <circle cx="88" cy="86" r="2.5" fill="white" />
      <circle cx="116" cy="86" r="2.5" fill="white" />
      {/* Blush */}
      <circle cx="76" cy="98" r="7" fill="#FFB6C1" opacity=".5" />
      <circle cx="124" cy="98" r="7" fill="#FFB6C1" opacity=".5" />
      {/* Smile */}
      <path
        d="M 86 102 Q 100 118 114 102"
        fill="none"
        stroke="#333"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
