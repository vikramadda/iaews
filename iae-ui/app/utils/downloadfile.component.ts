import { Component,Input } from '@angular/core';
import {BrowserXhr,Http} from '@angular/http';
import * as saveAs from 'file-saver';

@Component({
  selector: 'download',
  template: '<div class="filediv"><a (click)="downloadFile()"><img src="app/images/pdf-icon.png" class="pdf-icon"/>{{displayName}}</a></div>',
  styles :[`
	.pdf-icon{
    	width: 15px;
	    height: 15px;
	    margin-right: 5px;
	    margin-top: -5px;
	}
  .filediv{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  `]
 })
export class DownloadComponent {
 constructor(private http:Http) { }

@Input()
fileName:string;
@Input()
filePath:string;
@Input()
displayName:string;

  downloadFile() {
    this.http.get(this.filePath).subscribe(
        (response) => {
          var mediaType = 'application/pdf';
          var blob = new Blob([response.blob], {type: mediaType});
          var filename = this.fileName;
          saveAs(blob, filename);
        },
        ()=>console.log
        );
    }
}