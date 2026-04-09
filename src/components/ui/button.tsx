import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

const BUTTON_CLASSES =
  "inline-flex items-center justify-center rounded-xl font-bold transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-95 bg-brand-rose text-white px-6 py-3 disabled:scale-100 disabled:opacity-50 disabled:pointer-events-none";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const combinedClass = [BUTTON_CLASSES, className].filter(Boolean).join(" ");

    // When asChild is true, clone the single child element and inject our classes.
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<{ className?: string }>,
        {
          className: [
            (children as React.ReactElement<{ className?: string }>).props
              .className,
            combinedClass,
          ]
            .filter(Boolean)
            .join(" "),
        }
      );
    }

    return (
      <button
        ref={ref}
        className={combinedClass}
        aria-live="polite"
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
