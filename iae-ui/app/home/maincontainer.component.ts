import { Component } from '@angular/core';
import { Image } from '../utils/image.model';

@Component({
  moduleId: module.id,
  selector: 'app-main',
  templateUrl :'maincontainer.html',
  styleUrls:['style.css']
})
export class MainContainerComponent  {
	imageList: Image[] = [
	{ "title": "Khaidi No 150", "url": "http://images.indianexpress.com/2017/01/chiranjeevi-khaidi-no-150-review-759.jpg" },
	{ "title": "GPSK", "url": "http://www.filmjalsa.com/wp-content/uploads/2016/07/gpsk-660x330.jpg" },
	{ "title": "OM NAMO VENKATESHAYA", "url": "http://www.atozmp3.in/wp-content/uploads/2017/01/Om-Namo-Venkatesaya-2017-CD-Cover-Front-Poster-Wallpapers.jpg" },
	];
}
