"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Glob = require("glob");
const typescript_ioc_1 = require("typescript-ioc");
const merge_graphql_schemas_1 = require("merge-graphql-schemas");
const path_1 = require("path");
const graphql_tools_1 = require("graphql-tools");
exports.genSchema = () => {
    const pathToModules = path_1.join(__dirname, "../modules");
    const resolversClassArray = Glob.sync(`${pathToModules}/**/*.resolver.*`).map(resolver => require(resolver));
    const typesArray = merge_graphql_schemas_1.fileLoader(path_1.join(__dirname, "../"), {
        recursive: true,
        extensions: [".graphql"],
    });
    const typeDefs = merge_graphql_schemas_1.mergeTypes(typesArray, {
        all: true,
    });
    const schema = graphql_tools_1.makeExecutableSchema({
        typeDefs,
        resolvers: merge_graphql_schemas_1.mergeResolvers(resolversClassArray.map(thisClass => typescript_ioc_1.Container.get(thisClass.default).resolvers)),
    });
    return schema;
};
//# sourceMappingURL=genSchema.js.map