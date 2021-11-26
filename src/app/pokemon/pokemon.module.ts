import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';
import { pokemonRoutes } from './pokemon.routing';



@NgModule({
  declarations: [
    PokemonComponent,
    ListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pokemonRoutes),
  ]
})
export class PokemonModule { }
