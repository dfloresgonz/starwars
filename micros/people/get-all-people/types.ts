export type People = {
    id: number;
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    skin_color: string;
};

export type Rpta = {
    suma: number;
    datos: People[];
};
