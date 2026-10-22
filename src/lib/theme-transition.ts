import { flushSync } from "react-dom";

let changingTheme = false;

/** Reveal the new document from the initiating control, preserving next-themes persistence. */
export async function revealTheme(
  button: HTMLElement,
  updateTheme: () => void,
) {
  if (changingTheme) return;
  const root = document.documentElement;
  if (
    !document.startViewTransition ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    updateTheme();
    return;
  }

  changingTheme = true;
  const bounds = button.getBoundingClientRect();
  const x = bounds.left + bounds.width / 2;
  const y = bounds.top + bounds.height / 2;
  const radius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );
  let updated = false;
  root.dataset.themeTransition = "reveal";
  try {
    const transition = document.startViewTransition(() => {
      flushSync(updateTheme);
      updated = true;
    });
    try {
      await transition.ready;
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: Math.min(760, Math.max(520, radius * 0.55)),
          easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    } catch {
      // Hidden documents and interrupted transitions can skip their snapshots.
      transition.skipTransition();
    }
    await transition.finished;
  } catch {
    if (!updated) updateTheme();
  } finally {
    delete root.dataset.themeTransition;
    changingTheme = false;
  }
}
