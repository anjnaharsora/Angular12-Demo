import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
    ],
    declarations: [
      ConfirmDialogComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MaterialModule,
        FlexLayoutModule
    ]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }
}
