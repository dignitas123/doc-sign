export interface FileRowModel {
  name: string;
  allowAllEndings: boolean;
  allowOnlyImages: boolean;
  allowedEndings: string[];
  maxFileSize: number;
  uploadMultiple: number;
}

export const uploadMultipleOptions: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8
]

// - man sollte max file size festlegen können
// - man sollte multiple uploads eingrenzen können (1 - 8 mit ausklappmenü z.B.)
//   -- natürlich erstmal designen
