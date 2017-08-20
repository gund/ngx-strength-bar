import { InjectionToken } from '@angular/core';

import { Optional } from './util';

export interface StrengthChecker {
  (string: string): boolean;
}

export interface StrengthLevels {
  [k: string]: number;
}

export interface DefaultCheckerConfig {
  minLegth: number;
  numberRegexp: RegExp;
  specialChars: string;
  weakLevel: number;
  mediumLevel: number;
  strongLevel: number;
}

export type CheckerConfig = Optional<DefaultCheckerConfig>;

export const STRENGTH_CHECKERS = new InjectionToken<StrengthChecker[]>('STRENGTH_CHECKERS');
export const STRENGTH_LEVELS = new InjectionToken<StrengthLevels>('STRENGTH_LEVELS');

const defaultCheckerConfig: DefaultCheckerConfig = {
  minLegth: 4,
  numberRegexp: /\d+/,
  specialChars: '!@#$%^&*()_+§~/\\|[]{}<>`,.',
  weakLevel: 0,
  mediumLevel: 0.4,
  strongLevel: 0.9,
};

export function getDefaultLevels({
  weakLevel = defaultCheckerConfig.weakLevel,
  mediumLevel = defaultCheckerConfig.mediumLevel,
  strongLevel = defaultCheckerConfig.strongLevel,
}: CheckerConfig = {}): StrengthLevels {
  return {
    weak: weakLevel,
    medium: mediumLevel,
    strong: strongLevel,
  }
}

export function getDefaultCheckers(config: CheckerConfig = {}): StrengthChecker[] {
  Object.assign(defaultCheckerConfig, config);
  return [
    minLegthChecker,
    hasNumberChecker,
    hasSpecialCharChecker,
    hasUpperCaseChecker,
  ];
}

export function minLegthChecker(string: string) {
  return string.length > defaultCheckerConfig.minLegth;
}

export function hasNumberChecker(string: string) {
  return defaultCheckerConfig.numberRegexp.test(string);
}

export function hasSpecialCharChecker(string: string) {
  for (const char of string) {
    if (defaultCheckerConfig.specialChars.includes(char)) {
      return true;
    }
  }
  return false;
}

export function hasUpperCaseChecker(string: string) {
  for (const char of string) {
    if (!hasNumberChecker(char) &&
      !hasSpecialCharChecker(char) &&
      char.toUpperCase() === char) {
      return true;
    }
  }
  return false;
}
