import { memo } from "react";
import { FormValue } from "../../types";

type InputLineProps = FormValue & {
  onDelete: (id: string) => void;
  onChange: (newValue: FormValue) => void;
};

export const InputLine = memo(({ id, title, value, resValue, onDelete, onChange, oldValue }: InputLineProps) => {
  const onUseOldValue = () => {
    oldValue && onChange({ title, value: oldValue, id });
  };

  return (
    <>
      <input
        type="text"
        className="border rounded py-1 px-3"
        placeholder="Title"
        name="title"
        value={title}
        onChange={(e) => onChange({ title: e.target.value, value, id })}
      />
      <div className="border bg-slate-100 rounded min-w-24 flex items-center px-3">{oldValue}</div>
      <button className="border rounded py-1 px-3" onClick={onUseOldValue}>
        {">"}
      </button>
      <input
        type="text"
        className="border rounded py-1 px-3"
        placeholder="Value"
        name="value"
        value={value}
        onChange={(e) => onChange({ title, value: e.target.value, id })}
      />

      <div className="border bg-slate-100 rounded min-w-24 flex items-center px-3">{resValue || value}</div>
      <button onClick={() => onDelete(id)}>x</button>
    </>
  );
});
