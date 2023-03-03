import { makeSchema, mutationType, objectType } from "nexus";
import Pokemon from "./pokemon.model";

const errorHandler = (error: Error | string) => {
  // prevent db errors to go out to user. Use it only on dev env
  if (process.env.NODE_ENV === "development") {
    throw new Error(typeof error === "string" ? error : error.message);
  }
  throw new Error("Internal error");
};

const PokemonType = objectType({
  name: "Pokemon",
  definition(t) {
    t.int("id");
    t.string("name");
    t.boolean("favorite");
    t.string("type");
    t.string("type2");
    t.int("total");
    t.int("hp");
    t.int("attack");
    t.int("defense");
    t.int("spatc");
    t.int("spdef");
    t.int("speed");
    t.int("generation");
    t.boolean("legendary");
    t.string("createdate");
    t.string("updatedate");
  },
});

const PokemontsAndCountType = objectType({
  name: "Pokemons",
  definition(t) {
    t.list.field("pokemons_type", { type: PokemonType }), t.int("pages");
  },
});

const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("pokemons", {
      type: PokemontsAndCountType,
      args: {
        page: "Int",
        limit: "Int",
        name: "String",
        type: "String",
        favorite: "Boolean",
      },
      resolve: async (_, { page = 1, limit: limit = 20, name, type, favorite }: PokemonsQuery) => {
        const offset = (page - 1) * limit;
        const query = Pokemon.query().offset(offset).limit(limit);
        if (name) {
          query.where("name", "ilike", `%${name}%`);
        }
        if (type) {
          query.where("type", "ilike", type);
        }
        if (favorite) {
          query.where("favorite", favorite);
        }
        const [pokemons_type, count] = await Promise.all([query, query.resultSize()]);

        try {
          return {
            pokemons_type,
            pages: Math.ceil(count / limit),
          };
        } catch (error) {
          errorHandler(error);
        }
      },
    });
    t.field("pokemon", {
      type: PokemonType,
      args: {
        id: "Int",
        name: "String",
      },
      resolve: async (_, { id, name }: PokemonQuery) => {
        if (!id && !name) {
          throw new Error("wrong query used. One of [id, name] is required in query");
        }
        const query = Pokemon.query();
        try {
          if (id) {
            return await query.findById(id);
          }
          if (name) {
            return await query.findOne("name", "ilike", name);
          }
        } catch (error) {
          errorHandler(error);
        }
      },
    });
    t.list.field("types", {
      type: "String",
      resolve: async () => {
        try {
          return (await Pokemon.query().select("type").groupBy("type")).map((pokemon) => pokemon.type);
        } catch (error) {
          errorHandler(error);
        }
      },
    });
  },
});

const Mutation = mutationType({
  definition(t) {
    t.field("updateFavoritePokemon", {
      type: "Pokemon",
      args: {
        id: "Int",
      },
      resolve: async (_, { id }) => {
        try {
          const { favorite } = (await Pokemon.query().select("favorite").findById(id)) || {};
          return await Pokemon.query().patchAndFetchById(id, { favorite: !favorite });
        } catch (error) {
          errorHandler(error);
        }
      },
    });
  },
});

export const pokemonSchema = makeSchema({
  types: [Query, Mutation, PokemonType],
});
