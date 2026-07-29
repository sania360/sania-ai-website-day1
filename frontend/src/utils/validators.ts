export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const isRequired = (value: string) => value.trim().length > 0;
export const isValidPhone = (value: string) => /^[+\d][\d\s-]{6,}$/.test(value);
