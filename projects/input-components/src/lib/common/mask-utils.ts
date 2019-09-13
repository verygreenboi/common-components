/* tslint:disable:object-literal-key-quotes */
export const TAB = 9;
export const LEFT_ARROW = 37;
export const RIGHT_ARROW = 39;
export const BACKSPACE = 8;
export const DELETE = 46;

export const SPECIAL_CHARACTERS = [' ', '/', '(', ')', '+', '\/', '-'];

type DigitValidator = (char: string) => boolean;

const numericDigitValidator = char => /[0-9]/.test(char);
const lowercaseDigitValidator = char => /[a-z]/.test(char);
const uppercaseDigitValidator = char => /[A-Z]/.test(char);
const anyDigitValidator = _ => true;
const numberRangeDigitValidator = (max: number, char: string) => numericDigitValidator(max) && parseInt(char, 10) <= max;
export const neverValidator = char => false;


export const maskDigitValidators: {[key: string]: DigitValidator} = {
  '9': numericDigitValidator,
  'a': lowercaseDigitValidator,
  'A': uppercaseDigitValidator,
  '*': anyDigitValidator
};

for (let i = 0; i <= 9; i++) {
  maskDigitValidators[i] = numberRangeDigitValidator.bind(undefined, i);
}
