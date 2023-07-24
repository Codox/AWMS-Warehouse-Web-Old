import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewComponent} from './view/view.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { CommonModule } from '@angular/common';
import {AWMSComponentModule} from '../../components/awms/awms-component.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WarehouseBaseCVEComponent} from './cve/base/base.cve.component';
import {WarehouseEditComponent} from './cve/edit/edit.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'view',
      component: ViewComponent,
    },
    {
      path: ':uuid/edit',
      component: WarehouseEditComponent,
    },
    {
      path: ':uuid',
      component: WarehouseEditComponent,
    },
  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbInputModule,
    AWMSComponentModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbIconModule,
    FormsModule,
  ],
  declarations: [
    ViewComponent,
    WarehouseBaseCVEComponent,
    WarehouseEditComponent,
  ],
})
export class WarehouseModule { }
