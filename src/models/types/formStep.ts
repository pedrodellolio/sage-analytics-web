import type { ReactElement } from "react";
import type { ZodType } from "zod";

export type FormStep = {
  curr: string;
  prev?: string;
  next?: string;
  title: string;
  subtitle?: string;
  component: ReactElement;
  validationSchema?: ZodType<unknown>;
  fields: ("bank" | "files")[];
};
