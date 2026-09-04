/* 04_Component_Spec.md §9 — Button shared primitive */
/* primary: accent-primary bg | secondary: hairline border only */
/* 02_Design_System.md §4 — rounded-full or rounded-lg */

import { forwardRef } from "react";
import { useReducedMotion } from "framer-motion";

const variants = {
  primary:
    "bg-accent-primary text-white font-semibold hover:bg-accent-primary/90 transition-colors duration-300",
  secondary:
    "border border-border text-text-heading hover:border-accent-primary hover:bg-accent-soft transition-colors duration-300",
};

const Button = forwardRef(function Button(
  { variant = "primary", children, className = "", as: Component = "button", ...props },
  forwardedRef
) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Component
      ref={forwardedRef}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm select-none ${variants[variant]} ${className} ${shouldReduceMotion ? "" : "active:scale-[0.97] transition-transform duration-75"}`}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Button;

