import {
  Component, Input,
  OnInit,
  Optional,
  Self,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, NgControl
} from '@angular/forms';


@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ErrorMessageComponent implements ControlValueAccessor, OnInit {
  @Input() control: AbstractControl;
  @Input() key: string;

  constructor(@Optional() @Self() public ctrlDir: NgControl) {
    if (this.ctrlDir) {
      this.ctrlDir.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.control = this.control || (this.ctrlDir && this.ctrlDir.control);
  }

  onChange(event): void { }
  onTouched(): void { }
  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState(isDisabled: boolean): void { }
}
