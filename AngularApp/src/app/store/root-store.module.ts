import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { ProductEffects } from './effects/product';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot(reducers, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        EffectsModule.forRoot([
          ProductEffects,
          UserEffects
        ]),
    ],
    declarations: []
})

export class RootStoreModule { }
