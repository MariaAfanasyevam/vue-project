let timer: number | null = null;

export const debounce = <T extends (...args: any[]) => void>(
    f: T,
    delay: number,
): T => {
    return ((...args: Parameters<T>) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => f(...args), delay);
    }) as T;
};