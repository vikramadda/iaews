import { Component } from '@angular/core';
import { Image } from '../utils/image.model';

@Component({
  moduleId: module.id,
  templateUrl :'gallery.html',
  styleUrls:['style.css']
})
export class GalleryComponent  {
	diwaliImageHeader :string = "Diwali Celebrations";
	diwaliImageList: Image[] = [
	{ "title": "Diwali 1", "url": "http://iandeye.in/images/Diwali2016/1.jpg" },
	{ "title": "Diwali 2", "url": "http://iandeye.in/images/Diwali2016/2.jpg" },
	{ "title": "Diwali 3", "url": "http://iandeye.in/images/Diwali2016/3.jpg" },
	];
	sevaMelaImageHeader :string = "Seva Mela";
	sevaMelaImageList: Image[] = [
	{ "title": "Seva Mela 1", "url": "http://iandeye.in/images/SevaMela2015/1.jpg" },
	{ "title": "Seva Mela 2", "url": "http://iandeye.in/images/SevaMela2015/2.jpg" },
	{ "title": "Seva Mela 3", "url": "http://iandeye.in/images/SevaMela2015/3.jpg" },
	];
	T_ShirtImageHeader :string = "T-Shirt Distribution";
	T_ShirtImageList: Image[] = [
	{ "title": "T-shirt 1", "url": "http://iandeye.in/images/Tshirts/1.jpg" },
	{ "title": "Image 2", "url": "http://iandeye.in/images/Tshirts/2.jpg" },
	{ "title": "Image 3", "url": "http://iandeye.in/images/Tshirts/3.jpg" },
	];
}
