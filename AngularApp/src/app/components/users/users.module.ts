import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  bootstrap: []
})

export class UsersModule {}
