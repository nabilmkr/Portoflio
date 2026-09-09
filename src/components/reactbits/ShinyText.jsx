/**
 * ShinyText - React Bits Metallic Shimmering Text
 * ponytail: inline keyframe animation; upgrade to external css if shared across multiple non-react modules.
 */
export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = "",
}) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block relative bg-clip-text text-transparent bg-[linear-gradient(110deg,rgba(255,255,255,0.7),35%,rgba(255,255,255,1),50%,rgba(255,255,255,0.7),65%)] bg-[length:200%_100%] ${
        disabled ? "" : "animate-[shine_linear_infinite]"
      } ${className}`}
      style={{
        animationDuration: disabled ? undefined : animationDuration,
      }}
    >
      {text}
    </span>
  );
}
