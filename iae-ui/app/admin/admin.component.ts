import { Component } from '@angular/core';

@Component({
  selector: 'admin-section',
  template: `
  <div class="panel panel-primary" style="width: 75%;margin: 0 auto;margin-top: 30px;margin-bottom: 15px;">
   	<div class="panel-body">
    		<h2>Admin Links</h2>
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
    </div>
</div>

  `
})
export class AdminComponent  {}
