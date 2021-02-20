import React, { useEffect, useMemo, useState } from "react";
import { Combobox, Option, Optgroup } from "./components/combobox";
//import countries from "../data/countries.json";

type Country = {
  name: string;
  code: string;
};

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [val, setVal] = useState<Country>(countries[100]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/data/countries.json")
      .then((response) => response.json())
      .then((countries) => {
        setCountries(countries);
        setVal(countries[100]);
      });
  }, []);

  const options = useMemo(() => {
    const regexr = new RegExp(query, "i");
    return countries
      .filter((country: Country) => regexr.test(country.name))
      .map((country: Country) => (
        <Option key={country.code} value={country}>
          {country.name}
        </Option>
      ));
  }, [countries, query]);

  return (
    <div style={{ padding: 50 }}>
      <select value="IN">
        {countries.map((country: Country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      <p></p>
      <hr />
      <p></p>
      <Combobox<Country>
        value={val}
        onChange={setVal}
        display={(country?: Country) => country?.name ?? "select"}
        onSearch={setQuery}
      >
        {options}
      </Combobox>
    </div>
  );
}

export default App;
