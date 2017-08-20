import { CommonModule } from '@angular/common';
import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional, Self, SkipSelf } from '@angular/core';

import {
  CUSTOM_CONFIG,
  CUSTOM_STRENGTH_CHECKERS,
  CUSTOM_STRENGTH_LEVELS,
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

export function checkersFactory(config: DefaultCheckerConfig, overrideCheckers?: StrengthChecker[]) {
  return overrideCheckers || getDefaultCheckers(config);
}

export function levelsFactory(config: DefaultCheckerConfig, overrideLevels?: StrengthLevels) {
  return overrideLevels || getDefaultLevels(config);
}

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
        { provide: CUSTOM_CONFIG, useValue: config },
        { provide: CUSTOM_STRENGTH_CHECKERS, useValue: overrideCheckers },
        { provide: CUSTOM_STRENGTH_LEVELS, useValue: overrideLevels },
        {
          provide: STRENGTH_CHECKERS,
          useFactory: checkersFactory,
          deps: [CUSTOM_CONFIG, CUSTOM_STRENGTH_CHECKERS]
        },
        {
          provide: STRENGTH_LEVELS,
          useFactory: levelsFactory,
          deps: [CUSTOM_CONFIG, CUSTOM_STRENGTH_LEVELS]
        },
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
