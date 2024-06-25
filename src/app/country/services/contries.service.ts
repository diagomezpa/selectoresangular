import { Injectable } from '@angular/core';
import {
  Country,
  Region,
  SmallCountry,
} from '../interfaces/country.interfaces';
import { Observable, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContriesService {
  private baseUrl: string = 'https://restcountries.com/v3.1';

  private _regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Europe,
    Region.Oceania,
  ];

  constructor(private http: HttpClient) {}

  get regions(): Region[] {
    return [...this._regions]; // el operador spread rompela relacion con el _region
  }

  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);

    const url: string = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url).pipe(
      // map toma el responsa y regrasa otra cosa y lo pasa al siguiente operador
      map((countries) =>
        countries.map(
          (country) => ({
            name: country.name.common,
            cca3: country.cca3,
            borders: country.borders ?? [],
          }),
          tap((response) => console.log({ response }))
        )
      )
    );
  }
}
