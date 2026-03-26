interface Props {
  size?: number;
}

export default function Pippa({ size = 115 }: Props) {
  return (
    <svg viewBox="0 0 200 220" width={size} height={size}>
      {/* Body */}
      <ellipse cx="100" cy="140" rx="48" ry="58" fill="#2C2C54" />
      <ellipse cx="100" cy="148" rx="32" ry="42" fill="white" />
      {/* Head */}
      <circle cx="100" cy="78" r="38" fill="#2C2C54" />
      {/* Eyes */}
      <circle cx="86" cy="74" r="11" fill="white" />
      <circle cx="114" cy="74" r="11" fill="white" />
      <circle cx="88" cy="74" r="6" fill="#333" />
      <circle cx="116" cy="74" r="6" fill="#333" />
      <circle cx="89" cy="72" r="2.5" fill="white" />
      <circle cx="117" cy="72" r="2.5" fill="white" />
      {/* Beak */}
      <ellipse cx="100" cy="90" rx="8" ry="5" fill="#FFA500" />
      <path d="M 92 89 Q 100 96 108 89" fill="#FF8C00" />
      {/* Blush */}
      <circle cx="76" cy="86" r="6" fill="#FFB6C1" opacity=".4" />
      <circle cx="124" cy="86" r="6" fill="#FFB6C1" opacity=".4" />
      {/* Left wing (animated) */}
      <ellipse
        cx="52"
        cy="135"
        rx="10"
        ry="28"
        fill="#2C2C54"
        transform="rotate(15 52 135)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="10 52 135;30 52 135;10 52 135"
          dur=".8s"
          repeatCount="indefinite"
        />
      </ellipse>
      {/* Right wing (animated) */}
      <ellipse
        cx="148"
        cy="135"
        rx="10"
        ry="28"
        fill="#2C2C54"
        transform="rotate(-15 148 135)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-10 148 135;-30 148 135;-10 148 135"
          dur=".8s"
          repeatCount="indefinite"
          begin=".15s"
        />
      </ellipse>
      {/* Feet */}
      <ellipse cx="82" cy="198" rx="14" ry="6" fill="#FFA500" />
      <ellipse cx="118" cy="198" rx="14" ry="6" fill="#FFA500" />
      {/* Bow tie */}
      <circle cx="100" cy="112" r="4" fill="#FF6B9D" />
      <ellipse cx="90" cy="112" rx="8" ry="5" fill="#FF6B9D" />
      <ellipse cx="110" cy="112" rx="8" ry="5" fill="#FF6B9D" />
    </svg>
  );
}
