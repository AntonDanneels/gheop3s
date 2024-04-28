import { useState, useEffect } from "react";
import "./App.css";
import { ATCDPP } from "./assets/ATCDPP";

import {
  rules,
  evaluate,
  Gheop3sInput,
  Drug,
  DrugEntry,
  Gender,
  Frequency,
  Interval,
  Rule,
} from "./gheop3s";

import Fuse from "fuse.js";

function DropDownSearch({ drugSearch, selectedVal, onChange }) {
  let [isActive, setActive] = useState(false);
  let [selectedText, setSelectedText] = useState(selectedVal);

  let [proposedItems, setProposedItems] = useState(new Array<Drug>());

  return (
    <div className={"dropdown dropdownsearch " + (isActive ? "is-active" : "")}>
      <div className="dropdown-trigger dropdownsearch is-fullwidth">
        <button
          className="button is-fullwidth"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setActive(!isActive)}
        >
          <span>{selectedText.length > 0 ? selectedText : "Select drugs"}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Text input"
              onChange={(event) => {
                let result = drugSearch.search(event.target.value);
                setProposedItems(
                  result.slice(0, 10).map((res) => {
                    return res.item;
                  }),
                );
              }}
            />
          </div>
          {proposedItems.map((item: Drug, index: number) => {
            return (
              <a
                key={index}
                href="#"
                className="dropdown-item"
                onClick={() => {
                  setSelectedText(item.name);
                  setActive(false);
                  onChange(item);
                }}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TextInput({ initialValue, onChange }) {
  let [value, setValue] = useState(initialValue);

  return (
    <div className="control">
      <input
        className="input"
        type="text"
        placeholder="35"
        pattern="[0-9]+"
        value={value}
        onChange={(event) => {
          let newValue =
            event.target.value.length > 0 ? parseFloat(event.target.value) : 0;
          setValue(event.target.value);
          if (!isNaN(newValue)) {
            onChange(newValue);
          }
        }}
      />
    </div>
  );
}

function DrugEntryRow({ drugSearch, params, completed, onSubmit, onDelete }) {
  let [error, setError] = useState("");
  let [drugs, setDrugs] = useState(
    params ? params.drug : new Drug("invalid", ["invalid"]),
  );
  let [urgency, setUrgency] = useState(params ? params.urgency : "chronic");
  let [dosage, setDosage] = useState(params ? params.dosage : 0);
  let [dosageInterval, setDosageInterval] = useState(
    params ? params.dosageInterval : Interval.HOURLY,
  );

  console.log("mounted DrugEntryRow");
  console.log(params);

  return (
    <div className="">
      <div className="columns">
        <div className="column">
          <DropDownSearch
            drugSearch={drugSearch}
            selectedVal={drugs.name === "invalid" ? "" : drugs.name}
            onChange={(item: Drug) => {
              setDrugs(item);
            }}
          />
        </div>
        <div className="column">
          <div className="select is-fullwidth">
            <select
              className="is-expanded"
              value={urgency}
              onChange={(event) => {
                setUrgency(event.target.value);
              }}
            >
              <option value="chronic">Chronic</option>
              <option value="acute">Acute</option>
              <option value="as-needed">As needed</option>
            </select>
          </div>
        </div>
        <div className="column is-one-third">
          <div className="field has-addons">
            <TextInput
              initialValue={dosage}
              onChange={(val: number) => {
                setDosage(val);
              }}
            />
            <div className="select">
              <select
                className="is-expanded"
                onChange={(event) => {}}
                defaultValue="mg"
              >
                <option value="mg">mg</option>
                <option value="ug">ug</option>
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="spoon">spoon</option>
              </select>
            </div>
            <div className="select">
              <select
                className="is-expanded"
                onChange={(event) => {
                  setDosageInterval(event.target.value);
                }}
                defaultValue={dosageInterval}
              >
                <option value={Interval.HOURLY}>per hour</option>
                <option value={Interval.DAILY}>per day</option>
                <option value={Interval.WEEKLY}>per week</option>
                <option value={Interval.BIWEEKLY}>per 2 weeks</option>
                <option value={Interval.MONTHLY}>per month</option>
                <option value={Interval.QUARTERLY}>per 3 months</option>
                <option value={Interval.YEARLY}>per year</option>
                <option value={Interval.ANY}>other</option>
              </select>
            </div>
          </div>
        </div>
        <div className="column">
          <button
            className={
              completed
                ? "button is-fullwidth is-danger"
                : "button is-fullwidth is-primary"
            }
            onClick={() => {
              if (!completed) {
                if (drugs.name === "invalid") {
                  setError("No drugs selected");
                } else if (dosage === 0) {
                  setError("Invalid dosis");
                } else if (dosageInterval === "") {
                  setError("Invalid dosis interval");
                } else {
                  onSubmit(
                    new DrugEntry(
                      drugs,
                      drugs.atcs[0],
                      urgency,
                      dosage,
                      dosageInterval,
                    ),
                  );
                }
              } else {
                onDelete();
              }
            }}
          >
            {completed ? "Remove" : "Add"}
          </button>
        </div>
      </div>
      {error.length > 0 ? (
        <article className="message is-danger">
          <div className="message-header">
            <p>Invalid input</p>
          </div>
          <div className="message-body">{error}</div>
        </article>
      ) : (
        <div></div>
      )}
    </div>
  );
}

function ResultRow({ rule }) {
  return (
    <div className="columns">
      <div className="column">{rule.name}</div>
      <div className="column">{rule.criteria}</div>
      <div className="column">{rule.description}</div>
      <div className="column">{rule.alternative}</div>
    </div>
  );
}

function parseCsv(file: string) {
  let newDrugs: Array<Drug> = [];
  file.split("\n").map((line) => {
    let parts = line.split(";");
    if (parts[1] && parts[4]) {
      let regex = /['"]+/g;
      newDrugs.push(
        new Drug(parts[1].replace(regex, ""), [parts[4].replace(regex, "")]),
      );
    }
  });

  return newDrugs;
}

function App() {
  let [selectedDrugs, setSelectedDrugs] = useState(Array<DrugEntry>());
  let [drugs, setDrugs] = useState(parseCsv(ATCDPP));
  let [search, setSearch] = useState(new Fuse(drugs, { keys: ["name"] }));
  let [loading, setLoading] = useState(false);
  let [file, setFile] = useState("");
  let [key, setKey] = useState(new Date().toString());
  let [rules, setRules] = useState(new Array<Rule>());

  console.log("mounted app");

  useEffect(() => {
    if (loading) {
      let newDrugs = parseCsv(file);
      setDrugs(newDrugs);
      setLoading(false);
      setSearch(
        new Fuse(newDrugs, {
          keys: ["name"],
        }),
      );
    }
  }, [loading]);

  return (
    <div className="app">
      <h1 className="title">GheOP3s</h1>
      <div className="notification is-warning is-light">
        <h2 className="subtitle">
          Experimental - not for medical use: double check any result you get!
        </h2>
      </div>
      <div className="field">
        <input
          className="input"
          type="file"
          id="atc-codes"
          name="atc-codes"
          onChange={(event) => {
            if (
              event.target &&
              event.target.files &&
              event.target.files.length > 0
            ) {
              event.target.files[0].text().then((content) => {
                setLoading(true);
                setFile(content);
              });
            }
          }}
        />
        {loading && <h1>Loading...</h1>}
      </div>
      <div className="box">
        <div className="field is-grouped">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Text input" />
            </div>
          </div>
          <div className="field">
            <label className="label">Age</label>
            <div className="control">
              <input className="input" type="number" placeholder="Text input" />
            </div>
          </div>
          <div className="field">
            <label className="label">Sex</label>
            <div className="control">
              <div className="select">
                <select>
                  <option>Male</option>
                  <option>Female</option>
                  <option>X</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="columns">
          <div className="column is-flex is-flex-direction-column is-align-items-center">
            <label className="label">Drugs</label>
          </div>
          <div className="column is-flex is-flex-direction-column is-align-items-center">
            <label className="label">Urgency</label>
          </div>
          <div className="column is-flex is-flex-direction-column is-align-items-center">
            <label className="label">Dosage</label>
          </div>
          <div className="column"></div>
        </div>
        {selectedDrugs.map((entry: DrugEntry, index: number) => {
          return (
            <DrugEntryRow
              key={index}
              params={entry}
              drugSearch={search}
              completed={true}
              onSubmit={(_result: DrugEntry) => {}}
              onDelete={() => {
                setSelectedDrugs(
                  selectedDrugs.filter((_entry, i) => i !== index),
                );
              }}
            />
          );
        })}
        <DrugEntryRow
          key={key}
          completed={false}
          drugSearch={search}
          params={null}
          onSubmit={(result: DrugEntry) => {
            setSelectedDrugs([...selectedDrugs, result]);
            setKey(new Date().toString());
          }}
          onDelete={() => {}}
        />
        <hr />
        <div className="field">
          <div className="control">
            <button
              className="button is-primary"
              onClick={() => {
                let input = new Gheop3sInput(70, Gender.MALE, selectedDrugs);
                let rules = evaluate(input);

                console.log(rules);

                setRules(rules);
              }}
            >
              Calculate
            </button>
          </div>
        </div>
      </div>
      <h1 className="title">Results</h1>
      <div className="box">
        <div className="columns">
          <div className="column">
            <label className="label">Entry</label>
          </div>
          <div className="column">
            <label className="label">Criteria</label>
          </div>
          <div className="column">
            <label className="label">Description</label>
          </div>
          <div className="column">
            <label className="label">Alternatives</label>
          </div>
        </div>
        {rules.map((rule, index) => {
          return (
            <div key={index}>
              <ResultRow rule={rule} />
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
