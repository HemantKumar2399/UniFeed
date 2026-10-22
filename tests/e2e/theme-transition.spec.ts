import { expect, test } from "../support/fixtures";

test("theme reveals from its button in both directions and respects motion preferences", async ({
  page,
}) => {
  await page.emulateMedia({
    colorScheme: "light",
    reducedMotion: "no-preference",
  });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Toggle theme" }).first();
  await expect(toggle).toBeEnabled();
  await page.evaluate(() => scrollTo(0, 400));
  const scrollPosition = await page.evaluate(() => scrollY);
  for (const theme of ["dark", "light"]) {
    if (theme === "light")
      await page.setViewportSize({ width: 375, height: 812 });
    const origin = await toggle.boundingBox();
    if (theme === "light") await toggle.press("Enter");
    else await toggle.click();
    await expect
      .poll(() =>
        page.evaluate(() =>
          document.documentElement.classList.contains("dark"),
        ),
      )
      .toBe(theme === "dark");
    await expect
      .poll(
        () =>
          page.evaluate(() =>
            document
              .getAnimations()
              .some(
                (animation) =>
                  animation.effect instanceof KeyframeEffect &&
                  animation.effect.pseudoElement ===
                    "::view-transition-new(root)",
              ),
          ),
        { intervals: [25, 50, 100] },
      )
      .toBe(true);
    const keyframes = await page.evaluate(() => {
      const animation = document
        .getAnimations()
        .find(
          (animation) =>
            animation.effect instanceof KeyframeEffect &&
            animation.effect.pseudoElement === "::view-transition-new(root)",
        )!;
      animation.pause();
      animation.currentTime =
        Number(animation.effect!.getTiming().duration) * 0.3;
      return (animation.effect as KeyframeEffect)
        .getKeyframes()
        .map((frame) => frame.clipPath as string);
    });
    const center = keyframes[0]!.match(/at ([\d.]+)px ([\d.]+)px/)!;
    expect(Number(center[1])).toBeCloseTo(origin!.x + origin!.width / 2, 2);
    expect(Number(center[2])).toBeCloseTo(origin!.y + origin!.height / 2, 2);
    await page.screenshot({ path: `test-results/theme-reveal-${theme}.png` });
    await page.evaluate(() =>
      document
        .getAnimations()
        .filter(
          (animation) =>
            animation.effect instanceof KeyframeEffect &&
            animation.effect.pseudoElement === "::view-transition-new(root)",
        )
        .forEach((animation) => animation.play()),
    );
    await expect(page.locator("html")).not.toHaveAttribute(
      "data-theme-transition",
    );
    expect(await page.evaluate(() => scrollY)).toBe(scrollPosition);
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(
      theme,
    );
  }
  await page.reload();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await expect(toggle).toBeEnabled();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await toggle.click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme-transition",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.evaluate(() =>
    Object.defineProperty(document, "startViewTransition", {
      value: undefined,
      configurable: true,
    }),
  );
  await toggle.click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
});
