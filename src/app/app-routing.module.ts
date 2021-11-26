import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
  // Admin routes
  {
    path: '',
    children: [
      // Apps
      {
        path: 'apps', children: [
          { path: 'pokemon', loadChildren: () => import('src/app/pokemon/pokemon.module').then(m => m.PokemonModule) },

        ]
      }


    ]
  }
]