import { InjectionToken } from '@angular/core';

export interface StrengthChecker {
  (string: string): boolean;
}

export interface StrengthLevels {
  [k: string]: number;
}

export interface DefaultCheckerConfig {
  minLegth?: number;
  numberRegexp?: RegExp;
  specialChars?: string;
  weakLevel?: number;
  mediumLevel?: number;
  strongLevel?: number;
}

export const STRENGTH_CHECKERS = new InjectionToken<StrengthChecker[]>('STRENGTH_CHECKERS');
export const STRENGTH_LEVELS = new InjectionToken<StrengthLevels>('STRENGTH_LEVELS');

const NUMBER_REGEXP = /\d+/;
const MIN_LENGTH = 4;
const SPECIAL_CHARS = '!@#$%^&*()_+§~/\\|[]{}<>`,.';
const WEAK_LVL = 0;
const MEDIUM_LVL = 0.4;
const STRONG_LVL = 0.7;

export function getDefaultLevels({
  weakLevel = WEAK_LVL,
  mediumLevel = MEDIUM_LVL,
  strongLevel = STRONG_LVL,
}: DefaultCheckerConfig = {}): StrengthLevels {
  return {
    weak: weakLevel,
    medium: mediumLevel,
    strong: strongLevel,
  }
}

export function getDefaultCheckers({
  minLegth = MIN_LENGTH,
  numberRegexp = NUMBER_REGEXP,
  specialChars = SPECIAL_CHARS,
}: DefaultCheckerConfig = {}): StrengthChecker[] {
  return [
    minLegthChecker.bind(null, minLegth),
    hasNumberChecker.bind(null, numberRegexp),
    hasSpecialCharChecker.bind(null, specialChars),
    hasUpperCaseChecker.bind(null, numberRegexp, specialChars),
  ];
}

export function minLegthChecker(min: number, string: string) {
  return string.length > min;
}

export function hasNumberChecker(regexp: RegExp, string: string) {
  return regexp.test(string);
}

export function hasSpecialCharChecker(specialChars: string, string: string) {
  for (const char of string) {
    if (specialChars.includes(char)) {
      return true;
    }
  }
  return false;
}

export function hasUpperCaseChecker(numberRegexp: RegExp, specialChars: string, string: string) {
  for (const char of string) {
    if (!hasNumberChecker(numberRegexp, char) &&
      !hasSpecialCharChecker(specialChars, char) &&
      char.toUpperCase() === char) {
      return true;
    }
  }
  return false;
}
