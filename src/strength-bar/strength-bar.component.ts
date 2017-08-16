import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';

import { StrengthChecker } from './strength-bar';
import { StrengthService } from './strength/strength.service';

export interface StrengthBarTemplate {
  strength: string;
  levels: any[];
  reachedLevels: any[];
}

@Component({
  selector: 'ngx-strength-bar',
  templateUrl: './strength-bar.component.html',
  styleUrls: ['./strength-bar.component.css']
})
export class StrengthBarComponent implements OnChanges {

  @Input() string = '';
  @Input() bars = 5;
  @Input() extendCheckers: StrengthChecker[];
  @Input() overrideCheckers: StrengthChecker[];
  @Input() customTemplate: TemplateRef<StrengthBarTemplate>;

  @Output() onUpdate = new EventEmitter<string>();

  strength = '';
  levels: any[] = [];
  reachedLevels: any[] = [];
  templateCtx: StrengthBarTemplate = {} as any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private strengthService: StrengthService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['extendCheckers'] || changes['overrideCheckers'] || changes['string']) {
      this.updateStrength();
    } else if (changes['bars']) {
      this.updateLevels();
    }
  }

  private updateStrength() {
    const oldStrength = this.strength;

    this.strength = this.strengthService.computeStrengthOf(this.string, this.extendCheckers, this.overrideCheckers);
    this.reachedLevels = Array(
      this.strengthService.strengthToBarScale(
        this.strengthService.getLevel(this.strength), this.bars))
      .fill(null);

    this.updateLevels();
    this.updateContext();

    this.renderer.removeClass(this.elementRef.nativeElement, this.getStrengthClass(oldStrength));
    this.renderer.addClass(this.elementRef.nativeElement, this.getStrengthClass(this.strength));

    this.onUpdate.emit(this.strength);
  }

  private updateLevels() {
    if (this.levels.length === this.bars) {
      return;
    }

    this.levels = Array(this.bars).fill(null);
    this.updateContext();
  }

  private updateContext() {
    this.templateCtx = {
      strength: this.strength,
      reachedLevels: this.reachedLevels,
      levels: this.levels,
    };
  }

  private getStrengthClass(name: string) {
    return `strength-${name}`;
  }

}
