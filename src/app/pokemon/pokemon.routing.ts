import { Route } from '@angular/router';
import { ListComponent } from './list/list.component';

export const pokemonRoutes: Route[] = [
    {
                path     : '',
                component: ListComponent,
                resolve  : {
                    /*  brands    : InventoryBrandsResolver,
                      categories: InventoryCategoriesResolver,*/
                     // products  : ItemsProductsResolver,
                    /*  tags      : InventoryTagsResolver,
                      vendors   : InventoryVendorsResolver*/
                  },
                  children : [

                ]

        
    },
    
];