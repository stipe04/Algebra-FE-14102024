import React , {useState} from "react";
import './App.css';

function App() {
  const [language, setLanguage] = useState("hr");
  const content ={
    hr: {
      title: "Dobro došli na našu web stranicu",
      paragraph: "Ovo je primjer web stranice s podrškom na za više jezika",
      langLabel: "Jezik:",
    },
    en: {
      title: "Welcome to our website!!!",
      paragraph: "This is an example of a simple...",
      langLabel: "Language:",
    },
  }
  return (
    <div className="App">
      <div>
      <label>{content[language].langLabel}</label>
      <select value={language} onChange={(e)=> setLanguage(e.target.value)}>
        <option value="hr">Hrvatski</option>
        <option value="en">English</option>

      </select>
      
    </div>
    <h1>{content[language].title}</h1>
    <p>{content[language].paragraph}</p>
    </div>
  );
}

export default App;
