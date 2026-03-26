interface Props {
  size?: number;
}

export default function DJBunnySvg({ size = 80 }: Props) {
  const height = size * 1.2;
  return (
    <svg viewBox="0 0 100 120" width={size} height={height}>
      {/* Left ear */}
      <ellipse
        cx="38"
        cy="20"
        rx="10"
        ry="30"
        fill="#333"
        transform="rotate(-10 38 20)"
      />
      <ellipse
        cx="38"
        cy="20"
        rx="6"
        ry="22"
        fill="#555"
        transform="rotate(-10 38 20)"
      />
      {/* Right ear */}
      <ellipse
        cx="62"
        cy="20"
        rx="10"
        ry="30"
        fill="#333"
        transform="rotate(10 62 20)"
      />
      <ellipse
        cx="62"
        cy="20"
        rx="6"
        ry="22"
        fill="#555"
        transform="rotate(10 62 20)"
      />
      {/* Body */}
      <ellipse cx="50" cy="75" rx="28" ry="22" fill="#333" />
      <ellipse cx="50" cy="78" rx="20" ry="14" fill="#555" />
      {/* Head */}
      <circle cx="50" cy="55" r="26" fill="#333" />
      {/* Sunglasses */}
      <rect
        x="30"
        y="46"
        width="40"
        height="12"
        rx="6"
        fill="#FFD700"
        opacity=".9"
      />
      <circle cx="40" cy="52" r="5" fill="#222" />
      <circle cx="60" cy="52" r="5" fill="#222" />
      {/* Mouth */}
      <path
        d="M 44 64 Q 50 70 56 64"
        fill="none"
        stroke="#FFD700"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Headphones */}
      <circle
        cx="25"
        cy="50"
        r="12"
        fill="#444"
        stroke="#FFD700"
        strokeWidth="2"
      />
      <circle
        cx="75"
        cy="50"
        r="12"
        fill="#444"
        stroke="#FFD700"
        strokeWidth="2"
      />
      <path
        d="M 25 38 Q 50 32 75 38"
        fill="none"
        stroke="#444"
        strokeWidth="4"
      />
    </svg>
  );
}
