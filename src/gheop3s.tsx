import { rules } from "./gheop3s_rules";

export class Drug {
  constructor(
    public name: string,
    public atcs: Array<string>,
  ) {}
}

export class DrugEntry {
  constructor(
    public drug: Drug,
    public selectedAtc: string,
    public frequency: Frequency,
    public dosage: number,
    public dosageInterval: Interval,
  ) {}
}

export enum Gender {
  MALE,
  FEMALE,
}

enum Unit {
  WEIGHT,
  LIQUID,
}

enum Unit {
  MICROGRAMS = 0.001,
  MILLIGRAMS = 1,
  GRAMS = 1000,

  MILLILITER = 1,
}

export enum Frequency {
  ANY,
  CHRONIC,
  ACUTE,
  AS_NEEDED,
}

export enum Interval {
  ANY = 0,
  HOURLY = 1,
  DAILY = 24,
  WEEKLY = 7 * 24,
  BIWEEKLY = 2 * 7 * 24,
  MONTHLY = 30 * 24,
  QUARTERLY = (365 / 4) * 24,
  YEARLY = 365 * 24,
}

function dosageToRate(dosage: number, dosageInterval: Interval) {
  if (dosageInterval === Interval.ANY) {
    return 0;
  }
  return dosage * (1 / dosageInterval);
}

function dosageCompare(
  dosageA: number,
  dosageAInterval: Interval,
  dosageB: number,
  dosageBInterval: Interval,
) {
  let a = dosageToRate(dosageA, dosageAInterval);
  let b = dosageToRate(dosageB, dosageBInterval);

  return a >= b;
}

export class Gheop3sInput {
  constructor(
    public age: number,
    public gender: Gender,
    public drugs: Array<DrugEntry>,
  ) {}
}

abstract class Expression {
  evaluate(_input: Gheop3sInput): boolean {
    return false;
  }
}

export class AndExpression extends Expression {
  constructor(public childExpressions: Array<Expression>) {
    super();
    this.childExpressions = childExpressions;
  }

  evaluate(input: Gheop3sInput) {
    return this.childExpressions.every((exp) => exp.evaluate(input));
  }
}

export class OrExpression extends Expression {
  constructor(public childExpressions: Array<Expression>) {
    super();
    this.childExpressions = childExpressions;
  }

  evaluate(input: Gheop3sInput) {
    return this.childExpressions.some((exp) => exp.evaluate(input));
  }
}

export class AnyExpression extends Expression {
  constructor(public entry: DrugEntry) {
    super();
  }

  evaluate(input: Gheop3sInput) {
    return input.drugs.some(
      (entry) =>
        this.entry.drug.atcs.some((code) =>
          entry.selectedAtc.startsWith(code),
        ) &&
        dosageCompare(
          entry.dosage,
          entry.dosageInterval,
          this.entry.dosage,
          this.entry.dosageInterval,
        ),
    );
  }
}

export class NotExpression extends Expression {
  constructor(public expression: Expression) {
    super();
  }

  evaluate(input: Gheop3sInput) {
    return !this.expression.evaluate(input);
  }
}

export class Rule {
  constructor(
    public name: string,
    public criteria: string,
    public description: string,
    public alternative: string,
    public expression: Expression,
  ) {}

  evaluate(input: Gheop3sInput): boolean {
    return this.expression.evaluate(input);
  }
}

export function evaluate(input: Gheop3sInput) {
  return rules.filter((rule) => rule.evaluate(input));
}
