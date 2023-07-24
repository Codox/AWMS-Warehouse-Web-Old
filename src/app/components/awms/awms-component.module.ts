import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AWMSFormCountryDropdownComponent} from './awms-form-country-dropdown.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NbButtonModule, NbCardModule, NbInputModule, NbSelectModule} from '@nebular/theme';
import {AWMSFormInputComponent} from './awms-form-input.component';
import {AWMSConfirmationDialogueComponent} from './awms-confirmation-dialogue.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
  ],
  declarations: [
    AWMSFormCountryDropdownComponent,
    AWMSFormInputComponent,
    AWMSConfirmationDialogueComponent,
  ],
  exports: [
    AWMSFormCountryDropdownComponent,
    AWMSFormInputComponent,
    AWMSConfirmationDialogueComponent,
  ],
})
export class AWMSComponentModule {}
