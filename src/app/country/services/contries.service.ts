import { Injectable } from '@angular/core';
import { Region, SmallCountry } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ContriesService {
  private _regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Europe,
    Region.Oceania,
  ];

  constructor() {}

  get regions(): Region[] {
    return [...this._regions]; // el operador spread rompela relacion con el _region
  }

  getCountriesByRegion(region: Region): SmallCountry[] {
    return [];
  }
}
