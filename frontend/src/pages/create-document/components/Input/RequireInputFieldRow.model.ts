interface InputFieldAllowed {
  Text: boolean;
  Numbers: boolean;
  SpecialCharacters: boolean;
}

export enum InputFieldType {
  small_input_field = 'small_input_field',
  big_input_field = 'big_input_field',
  textarea = 'textarea'
}

export interface InputFieldModel {
  name: string;
  inputFieldAllowed: InputFieldAllowed;
  textAreaSize: InputFieldType;
  maxLength: number;
}
