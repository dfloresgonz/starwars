import { getStudentsRepository } from './repository';
import { Student } from './types';

export const getStudents = async (): Promise<Student[]> => {
    const data: Student[] = await getStudentsRepository();
    return data;
};
