import { Component } from '@angular/core';

@Component({
  selector: 'admin-section',
  template: `
<ul class="menu">
			<li>
				<a [routerLink]="['/activity','new']">Add New Activity</a>
			</li>
			<li>
				<a [routerLink]="['/project','new']">Add New Project</a>
			</li>
			<li>
				<a [routerLink]="['/upcomingevents','new']">Add Upcoming Events</a>
			</li>
			<li>
				<a [routerLink]="['/eventupdates','new']">Event Updates</a>
			</li>
		</ul>
  `
})
export class AdminComponent  {}
