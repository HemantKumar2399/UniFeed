import assert from "node:assert/strict";
import test from "node:test";
import { calculateNextStep, calculatePrevStep } from "./wizard-state.utils";

void test("calculates next step within bounds", () => {
    assert.equal(calculateNextStep(1, 3), 2);
    assert.equal(calculateNextStep(2, 3), 3);
    assert.equal(calculateNextStep(3, 3), 3);
});

void test("calculates prev step within bounds", () => {
    assert.equal(calculatePrevStep(3, 1), 2);
    assert.equal(calculatePrevStep(2, 1), 1);
    assert.equal(calculatePrevStep(1, 1), 1);
});
