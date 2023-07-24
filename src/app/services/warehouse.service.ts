import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Warehouse } from '../interfaces/warehouse.interface';
import {catchError, map} from 'rxjs/operators';
import {BASE_URL} from '../../shared/filterable-table-settings';

@Injectable()
export class WarehouseService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  async getWarehouse(uuid: string): Promise<Warehouse> {
    return this.httpClient.get(`${BASE_URL}/warehouse/${uuid}`).pipe(
      map((response: any) => response.data),
      catchError(error => {
        throw error;
      }),
    ).toPromise();
  }
}
