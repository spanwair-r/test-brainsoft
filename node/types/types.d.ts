interface IPokemon {
  id?: number;
  name: string;
  favorite: boolean;
  type: string;
  type2: string;
  total: number;
  hp: number;
  attack: number;
  defense: number;
  spatc: number;
  spdef: number;
  speed: number;
  generation: number;
  legendary: boolean;
  createdate?: string;
  updatedate?: string;
}

interface PokemonsQuery {
  page?: number;
  limit?: number;
  name?: string;
  type?: string;
  favorite?: boolean;
}

interface PokemonQuery {
  id?: number;
  name?: string;
}
