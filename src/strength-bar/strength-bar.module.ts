import { CommonModule } from '@angular/common';
import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional, Self, SkipSelf } from '@angular/core';

import {
  DefaultCheckerConfig,
  getDefaultCheckers,
  getDefaultLevels,
  STRENGTH_CHECKERS,
  STRENGTH_LEVELS,
  StrengthChecker,
  StrengthLevels,
} from './strength-bar';
import { StrengthBarComponent } from './strength-bar.component';
import { StrengthService } from './strength/strength.service';

const strengthBarModuleProvided = new InjectionToken<boolean>('StrengthBarModuleProvided');

@NgModule({
  imports: [CommonModule],
  declarations: [StrengthBarComponent],
  exports: [StrengthBarComponent],
})
export class StrengthBarModule {

  static forRoot(
    config?: DefaultCheckerConfig,
    overrideCheckers?: StrengthChecker[],
    overrideLevels?: StrengthLevels): ModuleWithProviders {
    return {
      ngModule: StrengthBarModule,
      providers: [
        { provide: strengthBarModuleProvided, useValue: true },
        { provide: STRENGTH_CHECKERS, useValue: overrideCheckers || getDefaultCheckers(config) },
        { provide: STRENGTH_LEVELS, useValue: overrideLevels || getDefaultLevels(config) },
        StrengthService,
      ]
    }
  }

  constructor(
    @Self() @Optional() @Inject(strengthBarModuleProvided) moduleProvided: boolean,
    @SkipSelf() @Optional() @Inject(strengthBarModuleProvided) parentModuleProvided: boolean,
  ) {
    if (moduleProvided && parentModuleProvided) {
      throw Error(`StrengthBarModule: Was already provided for root.
      Please import it once for root via static methods and then without.`);
    }
  }

}
