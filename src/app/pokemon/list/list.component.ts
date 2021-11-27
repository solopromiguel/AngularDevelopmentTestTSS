import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { DetailsComponent } from '../details/details.component';
import { PokemonService } from '../pokemon.service';
import { IPokemon, IPokemonPagination } from '../pokemon.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) private _paginator: MatPaginator;

  isLoading: boolean = false;
  pokemons$: Observable<IPokemon[]>;
  pagination: IPokemonPagination;
  displayedColumns = ['index', 'name', 'url', 'action']
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
  * Constructor
  */
  constructor(private _pokemonService: PokemonService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog) { }

  ngOnInit(): void {

    // Get the pagination
    this._pokemonService.pagination$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((pagination: IPokemonPagination) => {

        // Update the pagination
        this.pagination = pagination;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the pokemons
    this.pokemons$ = this._pokemonService.pokemons$;
  }
  /**
  * After view init
  */
  ngAfterViewInit(): void {
    if (this._paginator) {

      // Mark for check
      this._changeDetectorRef.markForCheck();

      // Get pokemons if  page changes
      merge(this._paginator.page).pipe(
        switchMap(() => {
          this.isLoading = true;
          return this._pokemonService.getPokemons(this._paginator.pageIndex, this._paginator.pageSize);
        }),
        map(() => {
          this.isLoading = false;
        })
      ).subscribe();
    }
  }
  refresh() {
    this._pokemonService.getPokemons(this._paginator.pageIndex, this._paginator.pageSize).subscribe();
  }
  getPokemon(name?: string): void {

    // Open the dialog
    const dialogRef = this._matDialog.open(DetailsComponent, {
      data: {
        pokemon: { name: name }
      },
      disableClose: false,
      height:'600px'
    });
    dialogRef.afterClosed()
      .subscribe((result) => {
        console.log('Compose dialog was closed!');
      });
  }

}
