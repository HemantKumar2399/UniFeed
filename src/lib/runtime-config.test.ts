import assert from "node:assert/strict";
import test from "node:test";

import {
  buildSeedEmail,
  getPrimaryAllowedDomain,
  resolveAppBaseUrl,
  resolveUploadPublicUrl,
} from "./runtime-config";

void test("resolveAppBaseUrl prefers the explicit app URL", () => {
  assert.equal(
    resolveAppBaseUrl({
      appUrl: "https://unifeed.example/",
      vercelUrl: "preview.vercel.app",
      port: "4010",
    }),
    "https://unifeed.example",
  );
});

void test("resolveAppBaseUrl falls back to localhost for local development", () => {
  assert.equal(resolveAppBaseUrl({ port: "4010" }), "http://localhost:4010");
});

void test("resolveUploadPublicUrl uses explicit public base URLs when present", () => {
  assert.equal(
    resolveUploadPublicUrl({
      key: "events/u1/banner.png",
      presignedUrl:
        "https://signed-upload.example/events/u1/banner.png?X-Amz-Signature=abc",
      publicBaseUrl: "https://cdn.unifeed.example/uploads/",
    }),
    "https://cdn.unifeed.example/uploads/events/u1/banner.png",
  );
});

void test("resolveUploadPublicUrl strips signing query params without a public base URL", () => {
  assert.equal(
    resolveUploadPublicUrl({
      key: "events/u1/banner.png",
      presignedUrl:
        "https://signed-upload.example/events/u1/banner.png?X-Amz-Signature=abc#fragment",
    }),
    "https://signed-upload.example/events/u1/banner.png",
  );
});

void test("allowed domain helpers use the first configured domain", () => {
  assert.equal(
    getPrimaryAllowedDomain(" students.college.edu , faculty.college.edu "),
    "students.college.edu",
  );
  assert.equal(
    buildSeedEmail("student.1", " students.college.edu , faculty.college.edu "),
    "student.1@students.college.edu",
  );
});
