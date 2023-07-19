import {FormGroup} from '@angular/forms';
import {OnInit} from "@angular/core";

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
}
