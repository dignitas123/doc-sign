interface InputFieldAllowed {
  Text: boolean;
  Numbers: boolean;
  SpecialCharacters: boolean;
}

export enum InputFieldType {
  default = 'default',
  small_input_field = 'small_input_field',
  big_input_field = 'big_input_field',
  textarea = 'textarea',
}

/**
 * links to material icon names
 * manual = 'tune' <- tune is the material icon name
 */
export enum InputTypes {
  manual = 'tune',
  mail = 'mail',
  telephone = 'call',
  link = 'link',
  password = 'visibility',
  date = 'calendar_month',
  time = 'schedule',
}

export interface InputFieldModel {
  name: string;
  inputFieldAllowed: InputFieldAllowed;
  inputType: InputTypes;
  inputLength: InputFieldType;
  maxLength: number;
}
