import { Injectable, Injector } from '@angular/core';

import { STRENGTH_CHECKERS, STRENGTH_LEVELS, StrengthChecker } from '../strength-bar';

export interface Level {
  name: string;
  lvl: number;
}

@Injectable()
export class StrengthService {

  private defaultCheckers = this.injector.get(STRENGTH_CHECKERS);
  private defaultLevels = this.injector.get(STRENGTH_LEVELS);
  private levels: Level[] = [];

  constructor(
    private injector: Injector,
  ) {
    this.bakeLevels();
  }

  getLevels() {
    return this.levels;
  }

  getLevel(name: string): number {
    return this.defaultLevels[name] || 0;
  }

  computeStrengthOf(
    string: string,
    extendCheckers?: StrengthChecker[],
    overrideCheckers?: StrengthChecker[]): string {
    const checkers = this.getCheckers(extendCheckers, overrideCheckers);

    if (checkers.length === 0) {
      return this.getLevelName(0);
    }

    const points = checkers.filter(checker => checker(string)).length;

    return this.getLevelName(points / checkers.length);
  }

  strengthToBarScale(lvl: number, bars: number): number {
    const percent = lvl * bars;
    const lastLevel = this.levels[this.levels.length - 1];
    return percent >= lastLevel.lvl ? bars : Math.floor(percent);
  }

  private bakeLevels() {
    this.levels = Object.keys(this.defaultLevels || {})
      .map(name => ({ name, lvl: this.defaultLevels[name] } as Level))
      .sort((l1, l2) => l1.lvl > l2.lvl ? 1 : l1.lvl < l2.lvl ? -1 : 0);

    if (this.levels.length > 0 || this.levels[0].lvl !== 0) {
      const zeroLvl = Object.assign({}, this.levels[0]);
      zeroLvl.lvl = 0;
      this.levels = [zeroLvl, ...this.levels];
    }
  }

  private getLevelName(level: number): string {
    let prevLvl = (this.levels[0] || { name: '' }).name;

    if (level === 0) {
      return prevLvl;
    }

    for (const { name, lvl } of this.levels) {
      if (level > lvl) {
        prevLvl = name;
      } else if (level <= lvl) {
        return prevLvl;
      }
    }

    return prevLvl;
  }

  private getCheckers(
    extendCheckers: StrengthChecker[] = [],
    overrideCheckers: StrengthChecker[] = []): StrengthChecker[] {
    return overrideCheckers.length > 0
      ? overrideCheckers
      : [...this.defaultCheckers, ...extendCheckers];
  }

}
