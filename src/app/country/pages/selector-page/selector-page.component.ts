import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContriesService } from '../../services/contries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css',
})
export class SelectorPageComponent implements OnInit {
  public countriesByRegion: SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private countriesServices: ContriesService
  ) {}

  ngOnInit(): void {
    this.onRegionChanged();
  }

  get regions(): Region[] {
    return this.countriesServices.regions;
  }

  onRegionChanged(): void {
    this.myForm
      .get('region')!
      .valueChanges.pipe(
        //tap(() => this.myForm.get('country')!.setValue('')),
        //recibe el valor de obsebable y lo suscribe a otro
        switchMap((region) =>
          this.countriesServices.getCountriesByRegion(region)
        )
        //switchMap(this.countriesServices.getCountriesByRegion)
      )
      .subscribe((countries) => {
        this.countriesByRegion = countries;
      });
  }
}
