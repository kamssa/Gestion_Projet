import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MaterialModule} from '../material/material.module';
import {MatMenuModule} from '@angular/material/menu';
import {TechniqueComponent} from './technique.component';
import {AddImageComponent} from './add-image/add-image.component';
import {EditTecniqueComponent} from './edit-tecnique/edit-tecnique.component';
import {DetailTechComponent} from './detail-tech/detail-tech.component';
import {NgxGalleryModule} from 'ngx-gallery-9';

import * as Hammer from 'hammerjs';
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule} from '@angular/platform-browser';

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    'pan': {
      direction: Hammer.DIRECTION_ALL,
    },
    'pinch': { enable: false },
    'rotate': { enable: false }
  }
}
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatChipsModule,
        MaterialModule,
        MatMenuModule,
        NgxGalleryModule,
        HammerModule
    ],
  declarations: [
    TechniqueComponent,
    AddImageComponent,
    EditTecniqueComponent,
    DetailTechComponent
  ],
  exports: [
    TechniqueComponent,
    AddImageComponent,
    EditTecniqueComponent,
    DetailTechComponent
      ],
  providers: [
    {provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig}]
})
export class TechniqueModule { }
