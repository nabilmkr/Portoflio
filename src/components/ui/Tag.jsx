/* 04_Component_Spec.md §9 — Tag shared primitive */
/* Small pill, accent-primary text on soft accent bg with crisp border */

export default function Tag({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center min-h-[34px] sm:min-h-0 px-3 py-1 text-xs font-medium text-white/85 bg-white/[0.04] border border-white/10 hover:border-accent-primary/40 hover:text-white hover:bg-accent-soft/80 rounded-lg transition-all duration-200 ${className}`}
    >
      {children}
    </span>
  );
}
