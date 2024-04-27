import { useState, useEffect } from "react";
import "./App.css";

import Fuse from "fuse.js";

class Drugs {
  constructor(
    public name: string,
    public atc: string,
  ) {}
}

class DrugEntry {
  constructor(
    public drugs: Drugs,
    public urgency: string,
    public dosage: number,
    public dosageInterval: string,
  ) {}
}

function DropDownSearch({ drugSearch, selectedVal, onChange }) {
  let [isActive, setActive] = useState(false);
  let [selectedText, setSelectedText] = useState(selectedVal);

  let [proposedItems, setProposedItems] = useState(new Array<Drugs>());

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
          {proposedItems.map((item: Drugs, index: number) => {
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
          setValue(event.target.value.replace(/\D/g, ""));
          onChange(value);
        }}
      />
    </div>
  );
}

function DrugEntryRow({ drugSearch, params, completed, onSubmit, onDelete }) {
  let [error, setError] = useState("");
  let [drugs, setDrugs] = useState(
    params ? params.drugs : new Drugs("invalid", "invalid"),
  );
  let [urgency, setUrgency] = useState(params ? params.urgency : "chronic");
  let [dosage, setDosage] = useState(params ? params.dosage : 0);
  let [dosageInterval, setDosageInterval] = useState(
    params ? params.dosageInterval : "",
  );

  console.log("mounted DrugEntryRow");
  console.log(params);

  return (
    <div className="">
      <div className="columns">
        <div className="column">
          <DropDownSearch
            drugSearch={drugSearch}
            selectedVal={drugs.name === "invalid" ? "" : drugs}
            onChange={(item: Drugs) => {
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
        <div className="column">
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
                onChange={(event) => {
                  setDosageInterval(event.target.value);
                  console.log(event.target.value);
                }}
              >
                <option value="hourly">per hour</option>
                <option value="daily">per day</option>
                <option value="weekly">per week</option>
                <option value="biweekly">per 2 weeks</option>
                <option value="monthly">per month</option>
                <option value="quarterly">per 3 months</option>
                <option value="yearly">per year</option>
                <option value="other">other</option>
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
                    new DrugEntry(drugs, urgency, dosage, dosageInterval),
                  );
                  setDrugs(new Drugs("invalid", "invalid"));
                  setUrgency("chronic");
                  setDosage(0);
                  setDosageInterval("");
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

function ResultRow({}) {
  return (
    <div className="columns">
      <div className="column">Dipyridamol</div>
      <div className="column">Veiligere alternatieven beschikbaar.</div>
      <div className="column">Vervang door acetylsalicylzuur</div>
    </div>
  );
}

function App() {
  let [selectedDrugs, setSelectedDrugs] = useState(Array<DrugEntry>());
  let [drugs, setDrugs] = useState(Array<Drugs>());
  let [search, setSearch] = useState(new Fuse(new Array<Drugs>(), {}));
  let [loading, setLoading] = useState(false);
  let [file, setFile] = useState("");

  console.log("mounted app");

  useEffect(() => {
    if (loading) {
      let newDrugs: Array<Drugs> = [];
      file.split("\n").map((line) => {
        let parts = line.split(";");
        if (parts[1] && parts[5]) {
          newDrugs.push(
            new Drugs(parts[1].substring(1, parts[1].length - 2), parts[5]),
          );
        }
      });
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
          completed={false}
          drugSearch={search}
          params={null}
          onSubmit={(result: DrugEntry) => {
            setSelectedDrugs((drugs) => [...drugs, result]);
          }}
          onDelete={() => {}}
        />
        <hr />
        <div className="field">
          <div className="control">
            <button className="button is-primary">Calculate</button>
          </div>
        </div>
      </div>
      <h1 className="title">Results</h1>
      <div className="box">
        <div className="columns">
          <div className="column">
            <label className="label">Drugs</label>
          </div>
          <div className="column">
            <label className="label">Rationale</label>
          </div>
          <div className="column">
            <label className="label">Alternatives</label>
          </div>
        </div>
        <ResultRow />
        <hr />
        <ResultRow />
      </div>
    </div>
  );
}

export default App;
