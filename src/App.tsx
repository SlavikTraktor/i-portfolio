import { useState } from "react";
import "./App.css";
import { Form, FormValue } from "./components/Form";
import { ChartPage } from "./pages/ChartPage";

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

  return (
    <>
      <Form defaultValues={values} onSubmit={onSubmit} />
    </>
  );
}

export default App;
