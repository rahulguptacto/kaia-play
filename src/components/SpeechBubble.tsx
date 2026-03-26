interface Props {
  visible: boolean;
}

export default function SpeechBubble({ visible }: Props) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "4%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 150,
        background: "white",
        borderRadius: 24,
        padding: "12px 24px",
        boxShadow: "0 6px 30px rgba(0,0,0,.2)",
        textAlign: "center",
        animation: "bubble-in .3s cubic-bezier(.34,1.56,.64,1)",
      }}
    >
      <div style={{ fontSize: 36 }}>🗣️</div>
      <div
        style={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          marginTop: 4,
        }}
      >
        {[0, 0.15, 0.3].map((delay) => (
          <div
            key={delay}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#FF6B9D",
              animation: `dance-bounce .6s ease-in-out ${delay}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
