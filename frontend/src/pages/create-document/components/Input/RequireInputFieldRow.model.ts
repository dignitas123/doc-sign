interface InputFieldAllowed {
  Text: boolean;
  Numbers: boolean;
  SpecialCharacters: boolean;
}

export enum InputLength {
  default = 1000,
  small_input_field = 26,
  big_input_field = 64,
  email = 320,
  textarea = 2500,
  url_input = 2048,
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
  inputLength: InputLength;
}

export function getInputTypeIcon(inputType: InputTypes) {
  switch (inputType) {
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
