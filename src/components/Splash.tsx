import "../styles/animations.css";

interface Props {
  onStart: () => void;
}

export default function Splash({ onStart }: Props) {
  const handleTap = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    onStart();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "linear-gradient(135deg, #FFB6C1, #E6B0FA, #87CEEB)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        cursor: "pointer",
      }}
      onTouchStart={handleTap}
      onClick={handleTap}
    >
      <div
        style={{
          fontSize: 120,
          animation: "splash-bounce 1s ease-in-out infinite alternate",
        }}
      >
        🌸
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: "white",
          textShadow: "0 2px 8px rgba(0,0,0,.2)",
          animation: "splash-pulse 1.5s ease-in-out infinite",
        }}
      >
        Tap to Play!
      </div>
      <div
        style={{
          fontSize: 60,
          animationDelay: "0.3s",
        }}
      >
        🎵 ✨ 🐱
      </div>
    </div>
  );
}
