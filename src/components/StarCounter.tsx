interface Props {
  count: number;
}

export default function StarCounter({ count }: Props) {
  const displayed = Math.min(count, 20);

  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
        maxWidth: 120,
        zIndex: 100,
      }}
    >
      {Array.from({ length: displayed }).map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: 18,
            animation: "star-pop .4s ease-out",
          }}
        >
          ⭐
        </span>
      ))}
    </div>
  );
}
