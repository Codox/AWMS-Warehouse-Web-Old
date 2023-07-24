import {Component, OnInit} from '@angular/core';
import {Warehouse} from '../../../../interfaces/warehouse.interface';
import {WarehouseService} from '../../../../services/warehouse.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-warehouse-edit',
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
})
export class WarehouseEditComponent implements OnInit {
  warehouse: Warehouse;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly warehouseService: WarehouseService,
  ) {}

  async ngOnInit(): Promise<void> {
    const uuid = this.route.snapshot.params['uuid'];
    this.warehouse = await this.warehouseService.getWarehouse(uuid);
  }
}
