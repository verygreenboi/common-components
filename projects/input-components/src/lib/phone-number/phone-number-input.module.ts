import { NgModule } from '@angular/core';
import { PhoneNumberComponent } from './phone-number.component';
import { KoboInputModule } from '../input/kobo-input.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlagDirective } from './flag-directive';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [PhoneNumberComponent, FlagDirective],
  imports: [CommonModule, KoboInputModule, FormsModule, MatRippleModule],
  exports: [PhoneNumberComponent, KoboInputModule, MatRippleModule]
})
export class KoboPhoneNumberModule {}
