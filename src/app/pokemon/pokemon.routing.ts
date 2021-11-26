import { Route } from '@angular/router';
import { ListComponent } from './list/list.component';
import { PokemonResolver } from './pokemon.resolvers';

export const pokemonRoutes: Route[] = [
    {
                path     : '',
                component: ListComponent,
                resolve  : {
                      pokemons  : PokemonResolver,
                  },
                  children : [

                ]

        
    },
    
];