import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-xl font-bold transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-95 bg-brand-rose text-white px-6 py-3 disabled:scale-100 disabled:opacity-50 disabled:pointer-events-none ${
          className ?? ""
        }`}
        aria-live="polite"
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
