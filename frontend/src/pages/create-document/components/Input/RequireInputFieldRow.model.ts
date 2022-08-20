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

export enum InputTypes {
  manual = 'text',
  mail = 'email',
  telephone = 'tel',
  link = 'url',
  password = 'password',
  date = 'date',
  time = 'time',
}

export interface InputFieldModel {
  name: string;
  inputFieldAllowed: InputFieldAllowed;
  inputType: InputTypes;
  textAreaSize: InputFieldType;
  maxLength: number;
}
