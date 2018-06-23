"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const from_schema_1 = require("@gql2ts/from-schema");
const path_1 = require("path");
const fs_1 = require("fs");
const genSchema_1 = require("../utils/genSchema");
fs_1.writeFile(path_1.join(__dirname, "../types/schema.d.ts"), from_schema_1.generateNamespace("GQL", genSchema_1.genSchema()), error => {
    console.log(error);
});
