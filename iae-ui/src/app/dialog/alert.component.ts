import { Component } from '@angular/core';
import { DialogComponent } from "./dialog.component";
import { DialogService } from "./dialog.service";
import {Location} from '@angular/common';


@Component({  selector: 'alert',
  template: `<div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title" [ngStyle]="{'color': title=='Success!'?'green':'red'}">{{title || 'Alert'}}</h4>
                   </div>
                   <div class="modal-body">
                     <p>{{message || '!!!'}}</p>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="OK(title)">OK</button>
                   </div>
                 </div>`
})
export class AlertComponent extends DialogComponent {
  constructor(dialogService: DialogService,
    private _location: Location) {
    super(dialogService);
  }

  OK(title:String):void{
     this.close();
     if(title=="Success!")
      this._location.back();
  }

}