import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Form, FormValue } from "./components/Form";
import { ChartPage } from "./pages/ChartPage";
import * as dataSaver from "./helpers/dataSaver";
import { emptyValue } from "./components/Form/helpers";
import { countResValue } from "./helpers/countResValue";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<FormValue[]>([emptyValue()]);

  const onSubmit = (values: FormValue[]) => {
    setSubmitted(true);
    setValues(values);
  };

  const onChange = (newValues: FormValue[]) => {
    setValues(newValues);
  };

  const onRowUpdate = useCallback((newValue: FormValue) => {
    setValues((v) => {
      const inx = v.findIndex((v) => v.id === newValue.id);
      newValue.resValue = countResValue(newValue.value);
      v[inx] = newValue;

      return [...v];
    });
  }, []);

  const onRowDelete = useCallback((id: FormValue["id"]) => {
    setValues((v) => {
      return v.filter((v) => v.id !== id);
    });
  }, []);

  useEffect(() => {
    const prevVals = dataSaver
      .getLastSavedData()
      ?.values.map<FormValue>((v) => ({ ...v, oldValue: v.value, value: "", resValue: undefined }));
    prevVals && setValues(prevVals);
  }, []);

  if (submitted) {
    return <ChartPage values={values || []} onReturn={() => setSubmitted(false)} />;
  }

  return (
    <>
      <Form values={values} onChange={onChange} onRowUpdate={onRowUpdate} onSubmit={onSubmit} onDelete={onRowDelete} />
    </>
  );
}

export default App;
