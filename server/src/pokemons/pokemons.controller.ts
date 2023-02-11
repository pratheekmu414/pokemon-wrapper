import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { responseHandler } from "../../handlers/response-handlers";
import { IPokemonController, IPokemonListing, IPokemonService } from "./pokemon.interface";
import { IOC_TYPES } from "../ioc.types";
import 'reflect-metadata';
import { controller, httpGet, request, response, next } from "inversify-express-utils";

@controller("/")
class PokemonController implements IPokemonController {

    private pokemonService: IPokemonService
    constructor(@inject(IOC_TYPES.pokemonService)
    pokemonService: IPokemonService) {
        this.pokemonService = pokemonService
    }

    @httpGet("pokedex")
    async fetchPokemons(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
        try {
            if (req.query?.pokemon) {
                const name: unknown = req.query?.pokemon
                const result = await this.pokemonService.fetchPokemonByName(name as string)
                return res.json({ result })
            }
            let result: Array<IPokemonListing> = await this.pokemonService.fetchAllPokemons()
            if (req.query?.search && result?.length) {
                const searchTerm = req.query?.search
                const filteredPokemons = result?.filter((pokemon: IPokemonListing) => {
                    return pokemon.name.includes(searchTerm as string)
                })
                return res.json({ result: filteredPokemons })
            }
            return res.json({ result })
        }
        catch (err: any) {
            return responseHandler.handleError(res, err?.message, err)
        }
    }


}

export default PokemonController;