export enum RadioChoice {
  multiple_choice = 'multiple_choice',
  single_choice = 'single_choice',
}

export interface RadioRowModel {
  name: string;
  radioChoice: RadioChoice;
  radioOneCheck: boolean;
  radioChoiceNames: string[];
}
