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
	{ "title": "Image 1", "url": "https://media.children.org/cdn-8d444fdddd63420/globalassets/home-page/holiday-home-page/what-we-do.jpg" },
	{ "title": "Image 2", "url": "https://media.children.org/cdn-8d444fdde271340/globalassets/home-page/holiday-home-page/who-we-are.jpg" },
	{ "title": "Image 3", "url": "https://media.children.org/cdn-8d444fddd9385d0/globalassets/home-page/holiday-home-page/how-you-help.jpg" },
	];
}
