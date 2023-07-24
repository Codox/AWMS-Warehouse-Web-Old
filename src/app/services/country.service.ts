import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../../shared/filterable-table-settings';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class CountryService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  async getCountries(): Promise<any> {
    return this.httpClient.get(`${BASE_URL}/country`).pipe(
      map((response: any) => response.data),
      catchError(error => {
        throw error;
      }),
    ).toPromise();
  }
}
