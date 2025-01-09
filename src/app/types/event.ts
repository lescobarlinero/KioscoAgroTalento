export interface Event {
    id?: number;
    name: string;
    description: string;
    date: string;
    themeId: number;
    active: boolean;
    image?: string | File;
    createdAt?: string;
    updatedAt?: string;
}