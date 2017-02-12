import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DialogHolderComponent } from "./dialog-holder.component";
import { DialogWrapperComponent } from "./dialog-wrapper.component";
import { AlertComponent } from './alert.component';
import { DialogService } from "./dialog.service";

@NgModule({
    declarations: [
        DialogHolderComponent,
        DialogWrapperComponent,
        AlertComponent
    ],
    providers: [
        DialogService
    ],
    imports: [
        CommonModule
    ],
    entryComponents: [
        DialogHolderComponent,
        DialogWrapperComponent,
        AlertComponent
    ]
})
export class IAEModalModule {}
