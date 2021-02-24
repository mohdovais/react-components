import { useState } from "../react";

export function useRandomId(prefix = "id"): string {
  const id = useState(() =>
    (Math.random() + Math.random()).toString(32).replace(/^\d\./, prefix + "-")
  );
  return id[0];
}
