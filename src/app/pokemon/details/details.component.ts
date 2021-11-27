import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { IPokemon, IPokemonDetail } from '../pokemon.types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pokemon$: Observable<IPokemonDetail>;
  /**
  * Constructor
  */
  constructor(@Inject(MAT_DIALOG_DATA) private _data: { pokemon: IPokemon },
  private _pokemonService: PokemonService) { }

  ngOnInit(): void {

    if (this._data.pokemon.name) {

      // Request the data from the server
      this._pokemonService.getPokemonByName(this._data.pokemon.name.toString()).subscribe(() => {

          // Get the pokemon
          this.pokemon$ = this._pokemonService.pokemon$;
      });
    }
  }

}
