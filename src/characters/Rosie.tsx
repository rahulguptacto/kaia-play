interface Props {
  size?: number;
}

export default function Rosie({ size = 115 }: Props) {
  return (
    <svg viewBox="0 0 200 220" width={size} height={size}>
      {/* Left ear (animated) */}
      <ellipse
        cx="75"
        cy="40"
        rx="14"
        ry="40"
        fill="#FFB6C1"
        transform="rotate(-10 75 40)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-10 75 40;-5 75 40;-10 75 40"
          dur="2s"
          repeatCount="indefinite"
        />
      </ellipse>
      <ellipse
        cx="75"
        cy="40"
        rx="8"
        ry="30"
        fill="#FF8FAB"
        transform="rotate(-10 75 40)"
      />
      {/* Right ear (animated) */}
      <ellipse
        cx="125"
        cy="40"
        rx="14"
        ry="40"
        fill="#FFB6C1"
        transform="rotate(10 125 40)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="10 125 40;5 125 40;10 125 40"
          dur="2s"
          repeatCount="indefinite"
          begin=".5s"
        />
      </ellipse>
      <ellipse
        cx="125"
        cy="40"
        rx="8"
        ry="30"
        fill="#FF8FAB"
        transform="rotate(10 125 40)"
      />
      {/* Body */}
      <ellipse cx="100" cy="155" rx="42" ry="35" fill="#FFB6C1" />
      <ellipse cx="100" cy="160" rx="30" ry="20" fill="white" />
      {/* Head */}
      <circle cx="100" cy="95" r="40" fill="#FFB6C1" />
      {/* Eyes */}
      <circle cx="85" cy="88" r="8" fill="#333" />
      <circle cx="115" cy="88" r="8" fill="#333" />
      <circle cx="87" cy="86" r="3" fill="white" />
      <circle cx="117" cy="86" r="3" fill="white" />
      {/* Nose & mouth */}
      <ellipse cx="100" cy="100" rx="5" ry="4" fill="#FF69B4" />
      <path
        d="M 90 106 Q 100 116 110 106"
        fill="none"
        stroke="#333"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Blush */}
      <circle cx="72" cy="100" r="7" fill="#FF69B4" opacity=".3" />
      <circle cx="128" cy="100" r="7" fill="#FF69B4" opacity=".3" />
      {/* Feet */}
      <ellipse cx="70" cy="182" rx="14" ry="10" fill="#FFB6C1" />
      <ellipse cx="130" cy="182" rx="14" ry="10" fill="#FFB6C1" />
      {/* Flower crown */}
      <circle cx="80" cy="62" r="6" fill="#FFD700" />
      <circle cx="100" cy="57" r="6" fill="#FF6B9D" />
      <circle cx="120" cy="62" r="6" fill="#A855F7" />
      <circle cx="80" cy="62" r="3" fill="white" />
      <circle cx="100" cy="57" r="3" fill="white" />
      <circle cx="120" cy="62" r="3" fill="white" />
      {/* Cottontail */}
      <circle cx="142" cy="155" r="12" fill="white" />
    </svg>
  );
}
