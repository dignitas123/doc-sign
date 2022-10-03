export enum RadioChoiceMode {
  multiple_choice = 'multiple_choice',
  single_choice = 'single_choice',
}

export enum Alignment {
  row = 'row',
  column = 'column',
  select = 'select',
}

export interface RadioChoice {
  name: string;
  selected: boolean;
}

export interface RadioRowModel {
  name: string;
  radioChoiceMode: RadioChoiceMode;
  radioOneCheck: boolean;
  radioChoices: RadioChoice[];
  alignment: Alignment;
}
