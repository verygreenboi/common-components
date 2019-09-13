import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { BACKSPACE, DELETE, LEFT_ARROW, maskDigitValidators, neverValidator, RIGHT_ARROW, SPECIAL_CHARACTERS, TAB } from './mask-utils';
import findLastIndex from 'lodash.findlastindex';
import findIndex from 'lodash.findindex';
import includes from 'lodash.includes';

export function replaceKey(input: HTMLInputElement, position: number, key: string) {
  const currentValue = input.value;
  input.value = currentValue.slice(0, position) + key + currentValue.slice(position + 1);
}

@Directive({
  selector: '[koboMask]'
})
export class KoboMaskDirective implements OnInit {
  @Input()
  mask = '';

  input: HTMLInputElement;

  wholeFieldSelected = false;

  constructor(private el: ElementRef) {
    this.input = el.nativeElement;
  }

  ngOnInit(): void {
    this.input.value = this.buildPlaceHolder();
  }
  @HostListener('select', ['$event'])
  onSelect($event: UIEvent) {
    this.wholeFieldSelected = this.input.selectionStart === 0 && this.input.selectionEnd === this.input.value.length;
  }

  @HostListener('keydown', ['$event', '$event.keyCode'])
  onKeyDown($event: KeyboardEvent, keyCode) {

    if ($event.metaKey || $event.ctrlKey) {
      return;
    }

    if (keyCode !== TAB) {
      $event.preventDefault();
    }

    if (this.wholeFieldSelected) {
      this.input.value = this.buildPlaceHolder();
      const firstPlaceholderPos = findIndex(this.input.value, char => char === '_');
      this.input.setSelectionRange(firstPlaceholderPos, firstPlaceholderPos);
    }

    let key = String.fromCharCode(keyCode);
    const currPos = this.input.selectionStart;

    switch (keyCode) {
      case LEFT_ARROW:
        this.moveLeft(currPos);
        return;
      case RIGHT_ARROW:
        this.moveRight(currPos);
        return;
      case BACKSPACE:
        this.handleBackspace(currPos);
        return;
      case DELETE:
        this.handleDelete(currPos);
        return;
    }

    const maskDigit = this.mask.charAt(currPos);

    if (maskDigit === 'a') {
      key = key.toLowerCase();
    } else if (maskDigit === 'A') {
      key = key.toUpperCase();
    }

    const validator = maskDigitValidators[maskDigit] || neverValidator;

    if (validator(key)) {
      replaceKey(this.input, currPos, key);
      this.moveRight(currPos);
    }
  }

  private moveLeft(currPos) {
    const previousPos = this.calculatePreviousPos(currPos);
    if (previousPos >= 0) {
      this.input.setSelectionRange(previousPos, previousPos);
    }
  }

  private moveRight(currPos) {
    const valueAfterCur = this.input.value.slice(currPos + 1);
    const nextPos = findIndex(valueAfterCur, char => !includes(SPECIAL_CHARACTERS, char));
    if (nextPos >= 0) {
      const newCursorPos = currPos + nextPos + 1;
      this.input.setSelectionRange(newCursorPos, newCursorPos);
    }
  }

  buildPlaceHolder(): string {
    const chars = this.mask.split('');
    return chars.reduce((a, c) => `${a}${SPECIAL_CHARACTERS.includes(c) ? c : '_'}`, '');
  }

  private handleBackspace(currPos: number) {
    const previousPos = this.calculatePreviousPos(currPos);

    if (previousPos >= 0) {
      replaceKey(this.input, previousPos, '_');
      this.input.setSelectionRange(previousPos, previousPos);
    }
  }

  private calculatePreviousPos(currPos: number) {
    const valueBeforeCursor = this.input.value.slice(0, currPos);
    return findLastIndex(valueBeforeCursor, char => !includes(SPECIAL_CHARACTERS, char));
  }

  private handleDelete(currPos: number) {
    replaceKey(this.input, currPos, '_');
    this.input.setSelectionRange(currPos, currPos);
  }
}

