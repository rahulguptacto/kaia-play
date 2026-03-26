interface Props {
  size?: number;
}

export default function Benny({ size = 115 }: Props) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      {/* Body */}
      <ellipse cx="100" cy="155" rx="52" ry="38" fill="#C8956C" />
      <ellipse cx="100" cy="160" rx="38" ry="22" fill="#F5DEB3" />
      {/* Head */}
      <circle cx="100" cy="90" r="45" fill="#C8956C" />
      {/* Ears */}
      <circle cx="60" cy="55" r="18" fill="#C8956C" />
      <circle cx="60" cy="55" r="11" fill="#F5DEB3" />
      <circle cx="140" cy="55" r="18" fill="#C8956C" />
      <circle cx="140" cy="55" r="11" fill="#F5DEB3" />
      {/* Muzzle */}
      <ellipse cx="100" cy="102" rx="22" ry="16" fill="#F5DEB3" />
      {/* Eyes */}
      <circle cx="85" cy="83" r="7" fill="#333" />
      <circle cx="115" cy="83" r="7" fill="#333" />
      <circle cx="87" cy="81" r="3" fill="white" />
      <circle cx="117" cy="81" r="3" fill="white" />
      {/* Nose & mouth */}
      <ellipse cx="100" cy="96" rx="6" ry="5" fill="#5C3D2E" />
      <path
        d="M 90 103 Q 100 114 110 103"
        fill="none"
        stroke="#5C3D2E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Hat */}
      <ellipse cx="100" cy="52" rx="35" ry="8" fill="#4169E1" />
      <rect x="78" y="25" width="44" height="28" rx="5" fill="#4169E1" />
      <rect x="85" y="38" width="30" height="6" rx="2" fill="#FFD700" />
      {/* Left arm (animated) */}
      <ellipse
        cx="52"
        cy="140"
        rx="12"
        ry="20"
        fill="#C8956C"
        transform="rotate(-15 52 140)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-15 52 140;-35 52 140;-15 52 140"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </ellipse>
      {/* Right arm (animated) */}
      <ellipse
        cx="148"
        cy="140"
        rx="12"
        ry="20"
        fill="#C8956C"
        transform="rotate(15 148 140)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="15 148 140;35 148 140;15 148 140"
          dur="1.2s"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </ellipse>
      {/* Feet */}
      <ellipse cx="70" cy="182" rx="16" ry="10" fill="#C8956C" />
      <ellipse cx="130" cy="182" rx="16" ry="10" fill="#C8956C" />
    </svg>
  );
}
