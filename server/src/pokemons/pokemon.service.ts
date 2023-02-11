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
            return { name: response.data?.name, image: response?.data?.sprites?.back_default }
        }
        catch (err) {
            return false;
        }
    }


    async fetchAllPokemons(): Promise<Array<IPokemonListing> | boolean> {
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

            return false;
        }

    }

    async fetchPokemonByName(name: string): Promise<unknown | boolean> {

        const config = {
            method: 'get',
            url: `${POKEMON_BASE_URL}/api/v2/pokemon/${name}`,
            headers: {}
        };

        try {
            const response = await axios(config)
            return [{ name: response.data?.name, image: response?.data?.sprites?.back_default }]
        }
        catch (err) {
            logger.error(err)
            return false;
        }

    }


}
export default PokemonService;