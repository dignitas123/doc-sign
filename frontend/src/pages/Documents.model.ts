import { File } from "web3.storage"

export interface File {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
}

export interface RejectedFile {
    failedPropValidation: string;
    file: File;
}
