import {Component, Input, OnInit} from '@angular/core';
import { Country } from '../../../../interfaces/country.interface';
import {CountryService} from '../../../../services/country.service';
import {Warehouse} from '../../../../interfaces/warehouse.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CVEMode} from '../../../../shared/cve-mode';
import {upperFirst} from 'lodash';

@Component({
  selector: `ngx-warehouse-base-cve`,
  templateUrl: `./base.cve.component.html`,
  styleUrls: [`./base.cve.component.scss`],
})
export class WarehouseBaseCVEComponent implements OnInit {
  @Input() warehouse: Warehouse;
  @Input() mode: CVEMode;

  countries: Country[];
  form: FormGroup;

  utils = {
    upperFirst,
  };

  constructor(
    private readonly countryService: CountryService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.countries = await this.countryService.getCountries();
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      uuid: new FormControl(''),
      contactTelephone: new FormControl('', Validators.required),
      addressLine1: new FormControl('', Validators.required),
      addressLine2: new FormControl('', Validators.required),
      addressLine3: new FormControl(''),
      town: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      country: new FormControl('', [Validators.required]),
    });

    if (this.warehouse) {
      this.form.patchValue(this.warehouse);

      for (let i = 0; this.warehouse.addressLines.length < 3; i++) {
        this.form.get('addressLine' + (i + 1)).patchValue(this.warehouse.addressLines[i]);
      }
    }
  }
}

