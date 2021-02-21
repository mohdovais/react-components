import React, { useEffect, useMemo, useState } from "react";
import { Combobox, Option, Optgroup } from "./components/combobox";
//import countries from "../data/countries.json";

type Country = {
  name: string;
  code: string;
};

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [val, setVal] = useState<Country | undefined>(countries[100]);
  const [val2, setVal2] = useState<Country[]>([]);
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
      <select>
        {countries.map((country: Country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      <select multiple onChange={(event) => console.log(event.target.value)}>
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
      <p></p>
      <hr />
      <p></p>
      <Combobox<Country>
        value={val2}
        onChange={setVal2}
        display={(countries: Country[]) =>
          countries.length === 0
            ? "select"
            : countries.length === 1
            ? countries[0].name
            : countries.length + " selected"
        }
        onSearch={setQuery}
        multiple
      >
        {options}
      </Combobox>
    </div>
  );
}

export default App;
