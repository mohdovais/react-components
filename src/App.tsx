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

  useEffect(() => {
    fetch("/data/countries.json")
      .then((response) => response.json())
      .then(setCountries);
  }, []);

  const options = useMemo(
    () =>
      countries.map((country: Country) => (
        <Option key={country.code} value={country}>
          {country.name}
        </Option>
      )),
    [countries]
  );

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
      >
        {options}
      </Combobox>
    </div>
  );
}

export default App;
