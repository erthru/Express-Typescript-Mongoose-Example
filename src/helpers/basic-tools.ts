export const splice = (str: string, start: number, delCount: number, newSubStr: string): string => {
    return str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount));
};

export const isEmpty = (obj: any): boolean => {
    return obj === undefined || obj === null || Object.keys(obj).length === 0 || obj.length === 0;
};
