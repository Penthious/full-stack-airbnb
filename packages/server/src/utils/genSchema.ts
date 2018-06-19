import * as Glob from "glob";
import { Container } from "typescript-ioc";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import { join } from "path";
import { makeExecutableSchema } from "graphql-tools";

export const genSchema = () => {
  const pathToModules = join(__dirname, "../modules");
  const resolversClassArray = Glob.sync(`${pathToModules}/**/*.resolver.*`).map(
    resolver => require(resolver),
  );

  const typesArray = fileLoader(join(__dirname, "../"), {
    recursive: true,
    extensions: [".graphql"],
  });

  const typeDefs = mergeTypes(typesArray, {
    all: true,
  });

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: mergeResolvers(
      resolversClassArray.map(
        thisClass => Container.get(thisClass.default).resolvers,
      ),
    ),
  });

  return schema;
};
