import {
  rules,
  evaluate,
  Gheop3sInput,
  Drug,
  DrugEntry,
  Gender,
  Frequency,
  Interval,
} from "./gheop3s";

import { describe, test, assert } from "vitest";

describe("test rule 1.1", () => {
  const input = new Gheop3sInput(70, Gender.FEMALE, [
    new DrugEntry(
      new Drug("clonidine", ["C02AC01"]),
      "C02AC01",
      Frequency.CHRONIC,
      100,
      Interval.DAILY,
    ),
  ]);

  let result = evaluate(input);

  test("match based on prefix", () => {
    assert.equal(result.length, 1);
    assert.equal(result[0].name, rules[0].name);
  });
});

describe("test rule 1.2", () => {
  let input1 = new Gheop3sInput(70, Gender.FEMALE, [
    new DrugEntry(
      new Drug("Digoxine", ["C02AC01"]),
      "C01AA05",
      Frequency.CHRONIC,
      0.125,
      Interval.DAILY,
    ),
  ]);

  let result1 = evaluate(input1);

  test("correct dosage matches", () => {
    assert.equal(result1.length, 1);
    assert.equal(result1[0].name, rules[1].name);
  });

  let input2 = new Gheop3sInput(70, Gender.FEMALE, [
    new DrugEntry(
      new Drug("Digoxine", ["C02AC01"]),
      "C01AA05",
      Frequency.CHRONIC,
      0.125,
      Interval.WEEKLY,
    ),
  ]);
  let result2 = evaluate(input2);

  test("incorrect dosage doesn't match", () => assert.equal(result2.length, 0));

  let input3 = new Gheop3sInput(70, Gender.FEMALE, [
    new DrugEntry(
      new Drug("Digoxine", ["C02AC01"]),
      "C01AA05",
      Frequency.CHRONIC,
      250,
      Interval.DAILY,
    ),
  ]);
  let result3 = evaluate(input3);

  test("heavy dosage does match", () => assert.equal(result3.length, 1));
});
