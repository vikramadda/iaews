import { NgModule }      from '@angular/core';
import { CommonModule } from "@angular/common";

import { CSSCarouselComponent } from './carousel.component'

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ CSSCarouselComponent ],
  exports :[ CSSCarouselComponent ]
})
export class UtilsModule { }
