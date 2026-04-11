import { EventEmitter } from "events";

const createEventEmitter = () => new EventEmitter();

const globalForEventEmitter = globalThis as unknown as {
  ee: ReturnType<typeof createEventEmitter> | undefined;
};

export const ee = globalForEventEmitter.ee ?? createEventEmitter();

if (process.env.NODE_ENV !== "production") {
  globalForEventEmitter.ee = ee;
}
