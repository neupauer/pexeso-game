import { useCallback, useMemo, useState } from "react";

function useSet(initialState = []) {
  const [values, setValues] = useState(initialState);

  const add = (...val) => {
    const s = new Set([...values, ...val]);
    setValues([...s]);
  };

  const remove = (val) => {
    const s = new Set(values);
    s.delete(val);
    setValues([...s]);
  };

  const has = (val) => {
    const s = new Set(values);
    return s.has(val);
  };

  const toggle = (val) => {
    const s = new Set(values);
    s.has(val) ? s.delete(val) : s.add(val);
    setValues([...s]);
  };

  const reset = (vals = []) => {
    setValues([...vals]);
  };

  return [
    values,
    {
      has,
      add,
      remove,
      toggle,
      reset,
    },
  ];
}

export default useSet;
