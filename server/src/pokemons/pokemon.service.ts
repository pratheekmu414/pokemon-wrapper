import axios from "axios";
import { injectable } from "inversify";
import 'reflect-metadata';
import { POKEMON_BASE_URL } from "../../constants/url-constants";
import { logger } from "../../logger";
import { IPokemonListing, IPokemonService } from "./pokemon.interface";

@injectable()
class PokemonService implements IPokemonService {

    private async fetchUrl(url: string) {
        const config = {
            method: 'get',
            url,
            headers: {}
        };
        try {
            const response = await axios(config)
            return { name: response.data?.name, image: response?.data?.sprites?.front_default }
        }
        catch (err) {
            logger.error(config.url, err)
            return false;
        }
    }


    async fetchAllPokemons(): Promise<Array<IPokemonListing>> {
        const config = {
            method: 'get',
            url: `${POKEMON_BASE_URL}/api/v2/pokemon`,
            headers: {}
        };
        try {
            const response = (await axios(config))?.data?.results?.map((item: IPokemonListing) => {
                return this.fetchUrl(item?.url)
            })
            return Promise.all(response)

        }
        catch (err) {
            logger.error(config.url, err)
            return [];
        }

    }

    async fetchPokemonByName(name: string): Promise<unknown> {

        const config = {
            method: 'get',
            url: `${POKEMON_BASE_URL}/api/v2/pokemon/${name}`,
            headers: {}
        };

        try {
            const response = await axios(config)

            const MOVES_LIMIT = 4
            const pokemonMoves = response.data?.moves?.slice(0, MOVES_LIMIT)?.map((item: any) => {
                return item?.move?.name
            })


            const pokemonType: [] = response.data?.types?.filter((item: any) => {
                return item?.type?.name
            }).map((item: any) => {
                return item?.type?.name
            })
            const pokemonAbilities = response.data?.abilities?.filter((item: any) => {
                return item?.ability?.name
            }).map((item: any) => {
                return item?.ability?.name
            })
            return [{
                name: response.data?.name, image: response?.data?.sprites?.front_default, details: {
                    experience: response.data?.base_experience,
                    types: pokemonType,
                    abilities: pokemonAbilities,
                    moves: pokemonMoves

                }
            }]
        }
        catch (err) {
            logger.error(config.url, err)
            return [];
        }

    }


}
export default PokemonService;