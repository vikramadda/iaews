//Import Component form the angular core package
import { Component, Input } from '@angular/core';

//Importt the Image interface
import {Image} from './image.model';


//Compoent Decorator
@Component({
  //Name of our tag
  selector: 'iae-imageslider',
  //Template for the tag
  template: `
 <div class="carousel">

  <ul class="slides" [ngStyle]="{'width': images.length*100+'%'}">

    <li *ngFor="let image of images" [ngStyle]="{'width': 100/images.length+'%'}">
      <img src="{{image.url}}" alt="">
      <h2>{{image.title}}</h2>
    </li>
   
  </ul>

</div>
  `,
  //Styles for the tag
  styles: [`
.carousel{
    overflow:hidden;
    width:100%;
}
.slides{
    list-style:none;
    position:relative;
    overflow:hidden;
    -moz-animation:carousel 10s infinite;
    -webkit-animation:carousel 10s infinite;
    animation:carousel 10s infinite;
    padding-left:0px;
    margin-left:15px;
}
.slides > li{
    position:relative;
    float:left;
}
.carousel img{
    display:block;
    width:100%;
    max-width:100%;
    height:220px;
}
.carousel h2{
    margin-bottom: 0;
    font-size:1em;
    padding:0.5em 0.5em 0.5em 0.5em;
    position:relative;
    right:0px;
    bottom:0px;
    left:0px;
    text-align:center;
    color:#fff;
    background-color:rgba(0,0,0,0.75);
    text-transform: uppercase;
}

@keyframes carousel{
    0%    { left:-5%; }
    11%   { left:-5%; }
    12.5% { left:-005%; }
    23.5% { left:-005%; }
    25%   { left:-005%; }
    36%   { left:-105%; }
    37.5% { left:-105%; }
    48.5% { left:-105%; }
    50%   { left:-105%; }
    61%   { left:-205%; }
    67.5% { left:-205%; }
    73.5% { left:-205%; }
    75%   { left:-105%; }
    86%   { left:-105%; }
    87.5% { left:-105%; }
    98.5% { left:-005%; }
    100%  { left:-5%; }
}
  `],
})
//Carousel Component itself
export class CSSCarouselComponent {
    //images data to be bound to the template
    @Input() images:Image[];
}