import { NgModule }      from '@angular/core';
import { CommonModule } from "@angular/common";

import { CSSCarouselComponent } from './carousel.component'
import { DownloadComponent } from './downloadfile.component';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ CSSCarouselComponent, DownloadComponent ],
  exports :[ CSSCarouselComponent, DownloadComponent ]
})
export class UtilsModule { }
