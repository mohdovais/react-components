import React, { useMemo, useState } from "react";
import "focus-visible";
import countries from "../data/countries.json";
import { Combobox, Option } from "./components/combobox";

type Country = {
  name: string;
  code: string;
};

function App(): JSX.Element {
  const [value, setValue] = useState<Country>();
  const [searchText, setSearchText] = useState("");
  const remoteOptions = useMemo(() => {
    console.log(searchText);
    if (searchText === "") {
      return [];
    } else {
      const regexr = new RegExp(searchText, "i");
      const options = countries
        .filter(
          (country) => regexr.test(country.name) || regexr.test(country.code)
        )
        .map((country: Country) => (
          <Option key={country.code} value={country}>
            {country.name}
          </Option>
        ));
      console.log(options);
      return options;
    }
  }, [searchText]);

  const localOptions = useMemo(() => {
    return countries.map((country: Country) => (
      <Option key={country.code} value={country}>
        {country.name}
      </Option>
    ));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      lorem ipsum
      <button type="button" onClick={() => console.log("dummy")}>
        dummy
      </button>
      <input type="text" />
      <Combobox
        value={value}
        displayRenderer={(record?: Country) => record?.name}
        onChange={setValue}
        onSearch={setSearchText}
        onClear={() => setValue(undefined)}
        remote
      >
        {remoteOptions}
      </Combobox>
      <Combobox
        value={value}
        displayRenderer={(record?: Country) => record?.name}
        onChange={setValue}
      >
        {localOptions}
      </Combobox>
    </div>
  );
}

export default App;
