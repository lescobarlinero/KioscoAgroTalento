export interface Multimedia {
    id?: number;
    name: string;
    multimediaTypeId: number;
    multimediaType?: MultimediaType;
    url: string;
    tags: string[];
    file: File;
}

export interface MultimediaType {
    id?: number;
    name: string;
    verboseName: string;
    multimediaTypeId?: number;
}