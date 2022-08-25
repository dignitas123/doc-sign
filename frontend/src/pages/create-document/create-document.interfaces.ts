import { InputFieldModel } from './components/Input/RequireInputFieldRow.model';
import { TextRowModel } from './components/Text/RequireTextRow.model';
import { RadioRowModel } from './components/Radio/RequireRadioChoiceRow.model';
import { FileRowModel } from './components/File/RequireFileRow.model';

export type CreateDocumentModelTypes = (InputFieldModel | TextRowModel | RadioRowModel | FileRowModel)
