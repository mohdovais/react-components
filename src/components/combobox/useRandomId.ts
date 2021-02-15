import * as React from "react";

export function useRandomId(prefix = "id") {
  const id = React.useState(() =>
    (Math.random() + Math.random())
      .toString(32)
      .replace(/^[0-9A-Za-z]+\./, prefix + "-")
  );
  return id[0];
}
