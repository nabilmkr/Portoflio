/* 04_Component_Spec.md §9 — Tag shared primitive */
/* Small pill, accent-primary text on soft accent bg */

export default function Tag({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center min-h-[36px] sm:min-h-0 px-3 py-1 text-xs font-medium text-accent-primary bg-accent-soft rounded-full ${className}`}
    >
      {children}
    </span>
  );
}
