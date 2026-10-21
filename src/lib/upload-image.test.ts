import assert from "node:assert/strict";
import { test } from "node:test";
import sharp from "sharp";
import { encodeUploadImage } from "./upload-image";

void test("image uploads reject active HTML and SVG even with an image MIME", async () => {
  await assert.rejects(
    encodeUploadImage(Buffer.from("<html><script>alert(1)</script></html>")),
  );
  await assert.rejects(
    encodeUploadImage(
      Buffer.from(
        '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>',
      ),
    ),
  );
});
void test("valid raster bytes are decoded and re-encoded as WebP", async () => {
  const png = await sharp({
    create: { width: 2, height: 2, channels: 3, background: "red" },
  })
    .png()
    .toBuffer();
  const output = await encodeUploadImage(png);
  assert.equal((await sharp(output).metadata()).format, "webp");
});
