import { GeneratorConfig } from "ng-openapi";
import { HttpResourcePlugin } from "@ng-openapi/http-resource";

export default {
  input: "./my-api.yaml",
  output: "./src/app/api",
  clientName: "ConduitApi",
  plugins: [HttpResourcePlugin],
  options: {
    dateType: "Date",
    enumStyle: "enum",
    generateServices: false,
  },
} as GeneratorConfig;