import { Model } from "objection";

interface Pokemon extends IPokemon {}

class Pokemon extends Model {
  updatedate: string;

  static get tableName() {
    return "pokemons";
  }

  $beforeUpdate() {
    this.updatedate = new Date().toISOString();
  }
}

export default Pokemon;
