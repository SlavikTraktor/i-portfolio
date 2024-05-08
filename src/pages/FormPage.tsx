import { useCallback, useEffect, useState } from "react";
import { Form, FormValue } from "../components/Form";
import { emptyValue } from "../components/Form/helpers";
import { countResValue } from "../helpers/countResValue";
import * as dataSaver from "../helpers/dataSaver";

interface FormPageInterface {
  onSubmit: (values: FormValue[]) => void;
  values?: FormValue[];
}

export const FormPage = ({ onSubmit, values: valuesCurrent }: FormPageInterface) => {
  const [values, setValues] = useState<FormValue[]>(valuesCurrent || [emptyValue()]);

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

  const usePreviousValues = () => {
    const newValues = values.map((v) => ({
      ...v,
      value: v.oldValue || v.value,
      resValue: countResValue(v.oldValue || v.value),
    }));

    setValues(newValues);
  };

  const addNewValue = () => {
    setValues([...values, emptyValue()]);
  };

  useEffect(() => {
    if (valuesCurrent) return;
    const prevVals = dataSaver
      .getLastSavedData()
      ?.values.map<FormValue>((v) => ({ ...v, oldValue: v.value, value: "", resValue: undefined }));
    prevVals && setValues(prevVals);
  }, []);

  return (
    <>
      <Form values={values} onChange={onChange} onRowUpdate={onRowUpdate} onDelete={onRowDelete} />
      <div>
        <button onClick={usePreviousValues}>Use previous</button>
        <button className="ml-2" onClick={addNewValue}>
          Add new
        </button>
        <button className="ml-2" onClick={() => onSubmit?.(values)}>
          Submit
        </button>
      </div>
    </>
  );
};
