import { uniqueId } from "lodash";
import { FormValue } from "./types";

export const emptyValue = (): FormValue => ({ id: uniqueId(), title: "", value: "" });
