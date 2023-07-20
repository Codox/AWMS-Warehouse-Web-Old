import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {upperFirst} from 'lodash';
import {Warehouse} from '../../../interfaces/warehouse.interface';
import {WarehouseService} from '../../../services/warehouse.service';
import {CountryService} from '../../../services/country.service';
import {Country} from '../../../interfaces/country.interface';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {CVEMode} from '../../../shared/cve-mode';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {AWMSConfirmationDialogueComponent} from '../../../components/awms/awms-confirmation-dialogue.component';
import {BaseCVEComponent} from '../../../components/cve/base.cve.component';

@Component({
  selector: 'ngx-warehouse-cve',
  styleUrls: ['./cve.component.scss'],
  templateUrl: './cve.component.html',
})
export class CVEComponent extends BaseCVEComponent implements OnInit {

  utils = {
    upperFirst,
  };

  loaded: boolean = false;

  warehouse: Warehouse;
  countries: Country[];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly warehouseService: WarehouseService,
    private readonly countryService: CountryService,
    private readonly dialogueService: NbDialogService,
  ) {
    super();


  }

  async getData(uuid: string) {
    this.warehouse = await this.warehouseService.getWarehouse(uuid);
  }

  async initForm() {
    this.setForm(new FormGroup({
      name: new FormControl(this.warehouse.name, Validators.required),
      uuid: new FormControl(this.warehouse.uuid),
      contactTelephone: new FormControl(this.warehouse.contactTelephone, Validators.required),
      addressLine1: new FormControl(this.warehouse.addressLines[0] ?
        this.warehouse.addressLines[0] : '', Validators.required),
      addressLine2: new FormControl(this.warehouse.addressLines[1] ?
        this.warehouse.addressLines[1] : '', Validators.required),
      addressLine3: new FormControl(this.warehouse.addressLines[2] ? this.warehouse.addressLines[2] : ''),
      town: new FormControl(this.warehouse.town, Validators.required),
      city: new FormControl(this.warehouse.city, Validators.required),
      region: new FormControl(this.warehouse.region, Validators.required),
      zipCode: new FormControl(this.warehouse.zipCode, Validators.required),
      country: new FormControl(this.warehouse.country, [Validators.required]),
    }));
  }

  async ngOnInit(): Promise<void> {
    this.mode = this.route.snapshot.queryParamMap.get('mode') as CVEMode;

    this.countries = await this.countryService.getCountries();

    const uuid = this.route.snapshot.params['uuid'];

    switch (this.mode) {
      case 'create':
        break;
      case 'edit':
        await this.getData(uuid);
        await this.initForm();
        await super.switchToEditMode();
        this.loaded = true;
        break;
      case 'view':
        await this.getData(uuid);
        await super.switchToViewMode();
        this.loaded = true;
        break;
    }
  }

  switchToEditMode(): void {
    this.router.navigate(['/pages/warehouse/', this.warehouse.uuid], {
      queryParams: {
        mode: 'edit',
      },
    });

    super.switchToEditMode();
  }

  async switchToViewMode(): Promise<void> {
    this.loaded = false;
    await this.router.navigate(['/pages/warehouse/', this.warehouse.uuid], {
      queryParams: {
        mode: 'view',
      },
    });
    await this.getData(this.warehouse.uuid);
    await super.switchToViewMode();
    this.loaded = true;
  }

  save(): void {

  }

  async discard(): Promise<void> {
    switch (this.mode) {
      case 'create':
        break;
      case 'edit':
        if (this.getForm().dirty) {
          const confirmed = await this.openDiscardChangesDialogue(this.dialogueService);
          if (confirmed) {
            setTimeout(async () => {
              await this.switchToViewMode();
            });
          }
        } else {
          await this.switchToViewMode();
        }
        break;
    }
  }
}
