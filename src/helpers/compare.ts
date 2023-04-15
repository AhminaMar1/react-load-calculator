export const isBigger = (value: number, origin: number): boolean => value > origin
export const isSmaller = (value: number, origin: number): boolean => value < origin
export const isInTheRange = (value: number, minOrigin: number, maxOrigin: number): boolean =>
    value <= maxOrigin && value >= minOrigin
