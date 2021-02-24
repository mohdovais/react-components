import React, { useEffect, useMemo, useState } from "react";
import { Combobox, Option } from "./components/combobox";
import { parseDate } from "./utils/date-parse";
//import countries from "../data/countries.json";

type Country = {
  name: string;
  code: string;
};

function App(): JSX.Element {
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
      <Combobox
        value={val}
        onChange={setVal}
        display={(country?: Country) => country?.name ?? "select"}
        onSearch={setQuery}
      >
        {options}
      </Combobox>

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
      <div>
        <hr />
      </div>
      <input
        type="text"
        onBlur={(event) => {
          const p = performance.now();
          const el = event.target;
          const val = parseDate(el.value);
          console.log(val, performance.now() - p);
          el.value = val;
        }}
      />
    </div>
  );
}

export default App;
