import DJBunnySvg from "../characters/DJBunnySvg";

interface Props {
  visible: boolean;
}

export default function DJBunny({ visible }: Props) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 90,
        animation: "dj-bounce .5s ease-in-out infinite alternate",
      }}
    >
      <DJBunnySvg />
    </div>
  );
}
