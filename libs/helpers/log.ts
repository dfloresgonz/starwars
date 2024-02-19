const Consola = console;
const Log = Consola.log;

export const log = (label: string, data: any): boolean => {
    Log(`\n${label}:`, data);
    return true;
};
