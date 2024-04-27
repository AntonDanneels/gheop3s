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
  QUARTERLY = (365 / 4) * 24,
  YEARLY = 365 * 24,
}

function dosageToRate(dosage: number, dosageInterval: Interval) {
  if (dosageInterval === Interval.ANY) {
    return Number.MAX_VALUE;
  }
  return dosage * dosageInterval;
}

function dosageCompare(
  dosageA: number,
  dosageAInterval: Interval,
  dosageB: number,
  dosageBInterval: Interval,
) {
  let a = dosageToRate(dosageA, dosageAInterval);
  let b = dosageToRate(dosageB, dosageBInterval);

  return a - b < 0 || Math.abs(a - b) <= 0.1;
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

class AndExpression extends Expression {
  constructor(public childExpressions: Array<Expression>) {
    super();
    this.childExpressions = childExpressions;
  }

  evaluate(input: Gheop3sInput) {
    return this.childExpressions.every((exp) => exp.evaluate(input));
  }
}

class OrExpression extends Expression {
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

class NotExpression extends Expression {
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

export const rules = [
  new Rule(
    "1.1",
    "Centraal werkende antihypertensiva (bv. clonidine, guanfacine, methyldopa, moxonidine)",
    "Hoog risico op ongewenste effecten op het centraal zenuwstelsel; Kan bradycardie en orthostatische hypotensie veroorzaken; Niet aanbevolen als routinebehandeling voor hypertensie",
    "Overweeg andere veiligere antihypertensiva, tenzij duidelijke intolerantie of gebrek aan werkzaamheid met andere klassen van antihypertensiva",
    new OrExpression(
      new DrugEntry(
        new Drug(
          "Centraal werkende antihypertensiva (bv. clonidine, guanfacine, methyldopa,moxonidine)",
          ["C02A", "C02LB", "C02LA", "C02LC"],
        ),
        "",
        Frequency.ANY,
        1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.2",
    "Ongunstige risico/batenverhouding (veiligere alternatieven beschikbaar); Risico op overdosering bij nierinsufficiëntie: nausea, braken, slaperigheid, gezichtsstoornissen, hartritmestoornissen",
    "",
    "",
    new OrExpression(
      new DrugEntry(
        new Drug("Digoxine > 0,125 mg/dag", ["C01AA05"]),
        "",
        Frequency.ANY,
        0.125,
        Interval.DAILY,
      ),
    ),
  ),
  new Rule(
    "1.3",
    "",
    "",
    "",
    new OrExpression(
      new DrugEntry(
        new Drug("Acetylsalicylzuur > 100 mg/dag", [
          "B01AC06",
          "B01AC56",
          "C07FX02",
          "C07FX03",
          "C07FX04",
          "C10BX01",
          "C10BX02",
          "C10BX04",
          "C10BX05",
          "C10BX06",
          "C10BX08",
          "C10BX12",
          "M01BA03",
          "N02AJ02",
          "N02AJ07",
          "N02AJ18",
          "N02BA01",
          "N02BA51",
          "N02BA71",
        ]),
        "",
        Frequency.ANY,
        0.1,
        Interval.DAILY,
      ),
    ),
  ),
  new Rule(
    "1.4",
    "",
    "",
    "",
    new OrExpression(
      new DrugEntry(
        new Drug("Dipyridamol", ["B01AC07"]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.5",
    "",
    "",
    "",
    new OrExpression(
      new DrugEntry(
        new Drug("PPI > 8 weken", ["A02BC", "B01AC56"]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
];

export function evaluate(input: Gheop3sInput) {
  return rules.filter((rule) => rule.evaluate(input));
}
