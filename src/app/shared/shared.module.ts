import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContainerComponent } from './container/container.component';
import { ErrorMessageComponent } from './error-message/error-message.component';


@NgModule({
  declarations: [ContainerComponent, ErrorMessageComponent],
  imports: [CommonModule],
  exports: [ErrorMessageComponent, ContainerComponent],
})
export class SharedModule { }
