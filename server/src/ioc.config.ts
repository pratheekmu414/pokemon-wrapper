import { Container } from "inversify";
import { IOC_TYPES } from "./ioc.types";
import PokemonService from "./pokemons/pokemon.service";
import  "./pokemons/pokemons.controller";

const container = new Container();
container.bind(IOC_TYPES.pokemonService).to(PokemonService)


export { container };