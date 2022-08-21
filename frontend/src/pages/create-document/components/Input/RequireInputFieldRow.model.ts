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
  inputLength: InputFieldType;
  maxLength: number;
}

export function getInputTypeIcon(inputType: InputTypes) {
  switch(inputType) {
    case InputTypes.manual:
      return 'tune';
    case InputTypes.mail:
      return 'mail';
    case InputTypes.telephone:
      return 'call';
    case InputTypes.link:
      return 'link';
    case InputTypes.password:
      return 'visibility';
    case InputTypes.date:
      return 'calendar_month';
    case InputTypes.time:
      return 'schedule';
    default:
      return '';
  }
}