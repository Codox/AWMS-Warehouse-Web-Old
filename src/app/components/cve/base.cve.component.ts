import {FormArray, FormGroup} from '@angular/forms';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-base-cve-component',
  template: '',
})
export abstract class BaseCVEComponent implements OnInit {
  form: FormGroup;

  setForm(form: FormGroup): void {
    this.form = form;
  }

  getForm(): FormGroup {
    return this.form;
  }

  ngOnInit(): void {
  }

  markControlsAsTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markControlsAsTouched(control);
      }
    });
  }

  abstract getData(uuid: string);
  abstract initForm();
}
