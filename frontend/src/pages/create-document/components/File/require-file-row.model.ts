export interface FileRowModel {
  name: string;
  allowAllEndings: boolean;
  allowOnlyImages: boolean;
  allowedEndings: string[];
  maxFileSize: number;
  uploadMultiple: number;
}

// - man sollte max file size festlegen können
// - man sollte multiple uploads eingrenzen können (1 - 8 mit ausklappmenü z.B.)
//   -- natürlich erstmal designen
