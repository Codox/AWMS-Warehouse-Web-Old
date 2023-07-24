import {AWMSFormComponent} from './awms-form.component';
import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Country} from '../../interfaces/country.interface';

@Component({
  selector: 'ngx-awms-form-country-dropdown',
  template: `
    <div class="form-group" [formGroup]="formOptions">
      <label [htmlFor]="objectName" class="label">{{ humanName }}</label>

      <br>

      <nb-select *ngIf="dropdownType === 'telephone'" [placeholder]="humanName" [id]="objectName" [formControlName]="objectName" style="width: 100%">
        <nb-option *ngFor="let country of countries" [value]="country.alpha['2']">{{ country.emoji }}&nbsp;&nbsp;{{ country.name + ' (+' + country.callingCode + ')              ' }}</nb-option>
      </nb-select>

      <nb-select *ngIf="dropdownType === 'countries'" [placeholder]="humanName" [id]="objectName" [formControlName]="objectName" style="width: 100%">
        <nb-option *ngFor="let country of countries" [value]="country.alpha['2']">{{ country.emoji }}&nbsp;&nbsp;{{ country.name + ' (' + country.alpha['2'] + ')              ' }}</nb-option>
      </nb-select>

      <small class="text-danger" *ngIf="formOptions && isFormValidationIssues(formOptions, objectName)">
        {{ formatErrorsIntoSingleMessage(formOptions.controls[objectName].errors) }}
      </small>

      <ng-template #telephoneLayout>

      </ng-template>
    </div>
  `,
})
export class AWMSFormCountryDropdownComponent extends AWMSFormComponent implements OnInit {
  @Input() formOptions: FormGroup;
  @Input() humanName?: string;
  @Input() objectName?: string;
  @Input() disabled?: boolean = false;
  @Input() countries: Country[];
  @Input() dropdownType: 'countries' | 'telephone' = 'countries';

  ngOnInit(): void {
  }

}
