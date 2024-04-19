import { useState } from "react";
import "./App.css";
import { Form, FormValue } from "./Form";
import { Chart } from "./Chart";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<FormValue[]>();

  const onSubmit = (values: FormValue[]) => {
    setSubmitted(true);
    setValues(values);
  };

  if (submitted) {
    return (
      <>
        <Chart values={values || []} />
        <button onClick={() => setSubmitted(false)}>Return</button>
      </>
    );
  }

  return (
    <>
      <Form defaultValues={values} onSubmit={onSubmit} />
    </>
  );
}

export default App;
