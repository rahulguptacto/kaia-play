interface Props {
  size?: number;
}

export default function Luna({ size = 115 }: Props) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      {/* Tail */}
      <path
        d="M 40 160 Q 10 130 20 100 Q 25 80 40 90"
        fill="none"
        stroke="#B088F9"
        strokeWidth="8"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-8 40 160;8 40 160;-8 40 160"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </path>
      {/* Body */}
      <ellipse cx="100" cy="150" rx="50" ry="35" fill="#B088F9" />
      <ellipse cx="100" cy="155" rx="35" ry="20" fill="#E0D0FF" />
      {/* Head */}
      <circle cx="100" cy="95" r="42" fill="#B088F9" />
      {/* Ears */}
      <polygon points="65,65 55,28 82,55" fill="#B088F9" />
      <polygon points="135,65 145,28 118,55" fill="#B088F9" />
      <polygon points="68,62 60,36 80,55" fill="#FFB6C1" />
      <polygon points="132,62 140,36 120,55" fill="#FFB6C1" />
      {/* Face */}
      <circle cx="100" cy="100" r="30" fill="#E0D0FF" />
      <ellipse cx="87" cy="88" rx="9" ry="10" fill="#333" />
      <ellipse cx="113" cy="88" rx="9" ry="10" fill="#333" />
      <circle cx="90" cy="85" r="3.5" fill="white" />
      <circle cx="116" cy="85" r="3.5" fill="white" />
      <ellipse cx="100" cy="98" rx="4" ry="3" fill="#FF8FAB" />
      <path
        d="M 90 104 Q 100 115 110 104"
        fill="none"
        stroke="#333"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Whiskers */}
      <line x1="58" y1="95" x2="78" y2="98" stroke="#ddd" strokeWidth="1.5" />
      <line x1="56" y1="103" x2="78" y2="102" stroke="#ddd" strokeWidth="1.5" />
      <line x1="122" y1="98" x2="142" y2="95" stroke="#ddd" strokeWidth="1.5" />
      <line
        x1="122"
        y1="102"
        x2="144"
        y2="103"
        stroke="#ddd"
        strokeWidth="1.5"
      />
      {/* Hair bow */}
      <circle cx="70" cy="68" r="5" fill="#FF6B9D" />
      <ellipse
        cx="60"
        cy="65"
        rx="9"
        ry="5.5"
        fill="#FF6B9D"
        transform="rotate(-20 60 65)"
      />
      <ellipse
        cx="78"
        cy="72"
        rx="9"
        ry="5.5"
        fill="#FF6B9D"
        transform="rotate(15 78 72)"
      />
      {/* Feet */}
      <ellipse cx="75" cy="178" rx="14" ry="8" fill="#B088F9" />
      <ellipse cx="125" cy="178" rx="14" ry="8" fill="#B088F9" />
    </svg>
  );
}
