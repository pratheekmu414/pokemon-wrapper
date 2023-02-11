import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { responseHandler } from "../../handlers/response-handlers";
import { IPokemonController, IPokemonService } from "./pokemon.interface";
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
            if (req.query?.name) {
                const name: unknown = req.query?.name
                const result = await this.pokemonService.fetchPokemonByName(name as string)
                return res.json({ result })
            }
            const result = await this.pokemonService.fetchAllPokemons()
            return res.json({ result })
        }
        catch (err: any) {
            return responseHandler.handleError(res, err?.message, err)
        }
    }


}

export default PokemonController;