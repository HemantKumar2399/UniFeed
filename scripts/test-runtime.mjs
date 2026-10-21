import "tsx";
import { register } from "node:module";

process.env.NODE_ENV = "test";
process.env.ALLOWED_DOMAINS ??= "students.example.edu";
process.env.DATABASE_URL ??= "postgresql://unit:unit@127.0.0.1:1/unifeed_unit";
process.env.AUTH_SECRET ??= "isolated-unit-test-auth-secret";
process.env.STUDENT_QR_SECRET ??= "isolated-unit-test-qr-secret";
register("./next-esm-loader.mjs", import.meta.url);
