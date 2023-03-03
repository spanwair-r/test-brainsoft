import { makeSchema } from "nexus";
import { pokemonSchema } from "./pokemons/pokemon.schema";

export const schema = makeSchema({
  types: [pokemonSchema],
  outputs: {
    schema: __dirname + "/generated/schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
});
