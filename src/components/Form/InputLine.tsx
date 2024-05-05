import { memo } from "react";
import { FormValue } from "../../types";

type InputLineProps = FormValue & {
  onDelete: (id: string) => void;
  onChange: (newValue: FormValue) => void;
};

export const InputLine = memo(({ onDelete, onChange, ...allValues }: InputLineProps) => {
  const { id, title, value, resValue, oldValue } = allValues;
  const onUseOldValue = () => {
    oldValue && onChange({ ...allValues, value: oldValue, id });
  };

  return (
    <>
      <input
        type="text"
        className="border rounded py-1 px-3"
        placeholder="Title"
        name="title"
        value={title}
        onChange={(e) => onChange({ ...allValues, title: e.target.value })}
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
        onChange={(e) => onChange({ ...allValues, value: e.target.value })}
      />

      <div className="border bg-slate-100 rounded min-w-24 flex items-center px-3">{resValue || value}</div>
      <button onClick={() => onDelete(id)}>x</button>
    </>
  );
});
