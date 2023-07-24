import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NbWindowService} from '@nebular/theme';
import {NavigationExtras, Router} from '@angular/router';
import {ServerDataSource} from 'ng2-smart-table';
import {getFilterableTableSettings} from '../../../../shared/filterable-table-settings';
import {CVEData} from '../../../shared/cve-mode';

@Component({
  selector: 'ngx-warehouse-view',
  styleUrls: ['./view.component.scss'],
  templateUrl: './view.component.html',
})
export class ViewComponent implements OnDestroy, OnInit {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly windowService: NbWindowService,
    private readonly router: Router,
  ) {}

  settings = {
    actions: {
      columnTitle: '',
      position: 'right',
      width: '5%',
      custom: [
        {
          name: 'view',
          title: '<img src="assets/icons/outline/eye-outline.svg" width="20" height="20" >',
        },
      ],
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      contactTelephone: {
        title: 'Contact Telephone',
        type: 'string',
      },
      addressLines: {
        title: 'Address Lines',
        type: 'array',
        valuePrepareFunction: (addressLines: string[]) => {
          return addressLines.join(', ');
        },
      },
      town: {
        title: 'Town',
        type: 'string',
      },
      city: {
        title: 'City',
        type: 'string',
      },
      region: {
        title: 'Region',
        type: 'string',
      },
      zipCode: {
        title: 'Zip Code',
        type: 'string',
      },
      country: {
        title: 'Country',
        type: 'string',
        width: '10%',
      },
    },
  };

  source: ServerDataSource = new ServerDataSource(
    this.httpClient,
    getFilterableTableSettings('warehouse'),
  );

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
   //  console.log('oninit');
  }

  async onCustom(event: any) {
    if (event.action === 'view') {
      const cveData: CVEData = {
        mode: 'view',
      };

      const navigationExtras: NavigationExtras = {
        queryParams: {
          ...cveData,
        },
      };

      await this.router.navigate(['/pages/warehouse/', event.data.uuid], navigationExtras);
    }
  }
}
