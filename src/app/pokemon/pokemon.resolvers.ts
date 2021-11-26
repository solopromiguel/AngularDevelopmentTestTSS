import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { PokemonService } from "./pokemon.service";
import { IPokemon, IPokemonPagination } from "./pokemon.types";

@Injectable({
    providedIn: 'root'
})
export class PokemonResolver implements Resolve<any>
{

    /**
     * Constructor
     */
     constructor(private _pokemonService: PokemonService)
     {
     }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ count: number  ; next : string ;previous : string; results: IPokemon[]}>
     {
         return this._pokemonService.getPokemons();
     }
}