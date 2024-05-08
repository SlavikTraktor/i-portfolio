import { useState } from "react";
import "./App.css";
import { FormValue } from "./components/Form";
import { ChartPage } from "./pages/ChartPage";
import { FormPage } from "./pages/FormPage";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<FormValue[]>();

  const onSubmit = (values: FormValue[]) => {
    setSubmitted(true);
    setValues(values);
  };

  if (submitted) {
    return <ChartPage values={values || []} onReturn={() => setSubmitted(false)} />;
  }

  return <FormPage  values={values} onSubmit={onSubmit} />;
}

export default App;
