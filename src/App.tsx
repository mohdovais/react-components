import React, { useMemo, useState } from "react";
import "focus-visible";
import countries from "../data/countries.json";
import { Combobox, Option } from "./components/combobox";

type Country = {
  name: string;
  code: string;
};

function App(): JSX.Element {
  const [values, setValues] = useState<Country[]>([]);
  const options = useMemo(
    () =>
      countries.map((country: Country) => (
        <Option key={country.code} value={country}>
          {country.name}
        </Option>
      )),
    []
  );

  return (
    <div style={{ padding: 20 }}>
      <Combobox<Country>
        value={values}
        multiple
        onChange={setValues}
        displayRenderer={(records: Country[]) =>
          records.length > 2
            ? records.length + " selected"
            : records.map((record) => record.name).join(", ")
        }
        onSearch={(query: string) => console.log(query)}
      >
        {options}
      </Combobox>
    </div>
  );
}

export default App;
