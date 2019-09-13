import { ModuleWithProviders, NgModule } from '@angular/core';
import { InputComponent } from './input.component';
import { CommonModule } from '@angular/common';
import { InputRefDirective } from '../common/input-ref-directive';
import { MatIconModule } from '@angular/material/icon';
import { HintRefDirective } from '../common/hint-ref-directive';
import { KoboMaskDirective } from '../common/mask-directive';
import { KoboInputServiceService } from '../service/kobo-input-service.service';


@NgModule({
  declarations: [InputComponent, InputRefDirective, HintRefDirective, KoboMaskDirective],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [InputComponent, InputRefDirective, HintRefDirective, KoboMaskDirective]
})
export class KoboInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: KoboInputModule,
      providers: [KoboInputServiceService]
    };
  }
}
