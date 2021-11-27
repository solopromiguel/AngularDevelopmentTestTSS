import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { IPokemon, IPokemonDetail, IPokemonPagination } from './pokemon.types';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  // Private
  private _pokemons: BehaviorSubject<IPokemon[]> = new BehaviorSubject<IPokemon[]>([]);
  private _pokemon: BehaviorSubject<IPokemonDetail | null> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<IPokemonPagination> = new BehaviorSubject<IPokemonPagination>({offset:1, limit:10 , count:null, previous:null,next:null});
  private readonly resource: string = 'https://pokeapi.co/api/v2'
  /**
  * Constructor
  */
  constructor(private _httpClient: HttpClient) { }

  /**
  * Getter for pagination
   */
   get pagination$(): Observable<IPokemonPagination> {
    return this._pagination.asObservable();
  }
  /**
  * Getter for pokemons
  */
  get pokemons$(): Observable<IPokemon[]> {
    return this._pokemons.asObservable();
  }
  /**
     * Getter for pokemon
     */
   get pokemon$(): Observable<IPokemonDetail> {
    return this._pokemon.asObservable();
}

    /**
    * Get pokemons
    *
    *
    * @param page
    * @param size
    * @param sort
    * @param order
    * @param search
    */
    getPokemons(offset: number = 1, limit: number = 5):
        Observable<{ count: number  ; next : string ;previous : string; results: IPokemon[] }> {
        return this._httpClient.get<{ count: number  ; next : string ;previous : string; results: IPokemon[] }>(this.resource + "/pokemon", {
            params: {
              offset: '' + offset,
              limit: '' + limit,
            }
        }).pipe(
            tap((response) => {
                this._pagination.next({offset,limit,count:response.count,next:response.next,previous:response.next});
                this._pokemons.next(response.results);
            })
        );
    }

    /**
     * Get pokemon by name
     */
    getPokemonByName(name: string): Observable<IPokemonDetail> {
        return this._httpClient.get<IPokemonDetail>(this.resource + '/pokemon/' + name).pipe(
            map(pokemon => {
                this._pokemon.next(pokemon);
                return pokemon
            })
        );

    }

}
