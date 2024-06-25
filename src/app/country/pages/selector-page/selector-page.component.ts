import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContriesService } from '../../services/contries.service';
import { Region } from '../../interfaces/country.interfaces';

@Component({
  selector: 'selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css',
})
export class SelectorPageComponent {
  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private countriesServices: ContriesService
  ) {}

  get regions(): Region[] {
    return this.countriesServices.regions;
  }
}
