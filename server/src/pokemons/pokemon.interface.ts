import { NextFunction, Request, Response } from "express";

export interface IPokemonListing {
    name: string,
    url: string
}
export interface IPokemonService {
    fetchAllPokemons: () => Promise<Array<IPokemonListing>>
    fetchPokemonByName: (name: string) => Promise<unknown >
}

export interface IPokemonController {
    fetchPokemons: (req: Request, response: Response, next: NextFunction) => Promise<Response>
}