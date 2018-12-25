import { generateNamespace } from "@gql2ts/from-schema";
import { join } from "path";
import { writeFile } from "fs";

import { genSchema } from "../utils/genSchema";

writeFile(
  join(__dirname, "../types/schema/index.d.ts"),
  generateNamespace("GQL", genSchema()),
  error => {
    console.log(error);
  },
);
