import { useState } from "react";
import "./App.css";

function DrugEntryRow({ completed }) {
  return (
    <div className="fixed-grid has-4-cols">
      <div className="grid">
        <label className="cell label">Drugs</label>
        <label className="cell label">Age</label>
        <label className="cell label">Gender</label>
        <label className="cell label"></label>
        <div className="cell">
          <div className="control">
            <div className="select">
              <select>
                <option>Ibuprofen</option>
                <option>Ibuprofen</option>
              </select>
            </div>
          </div>
        </div>
        <div className="cell">
          <div className="control">
            <input className="input" type="number" placeholder="Text input" />
          </div>
        </div>
        <div className="cell">
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
        <div className="cell">
          <div className="control">
            <button
              className={completed ? "button is-danger" : "button is-primary"}
            >
              {completed ? "Remove" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropDownSearch({ searchList, onChange }) {
  let [isActive, setActive] = useState(false);

  return (
    <div
      className={"dropdown " + (isActive ? "is-active" : "")}
      onBlur={() => {
        setActive(false);
      }}
    >
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setActive(!isActive)}
        >
          <span>Select drugs</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <div className="control">
            <input className="input" type="text" placeholder="Text input" />
          </div>
          {searchList.map((item: string) => {
            return (
              <a href="#" className="dropdown-item">
                {item}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function App() {
  let searchList = ["Ibuprofen 500mg", "Ibuprofen 800mg"];

  return (
    <div className="app">
      <h1 className="title">GheOP3s</h1>
      <DropDownSearch searchList={searchList} />
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
            <label className="label">Gender</label>
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
        <DrugEntryRow completed={true} />
        <hr />
        <DrugEntryRow completed={false} />

        <div className="field">
          <div className="control">
            <button className="button is-primary">Calculate</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
