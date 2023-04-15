export const toNumberOrZero = (value = "0"): number => +value

export const toLocalPrice = (value: number, minFac: number, maxFac: number): string => {
    return value.toLocaleString("us-US", {
        minimumFractionDigits: minFac,
        maximumFractionDigits: maxFac,
        style: "currency",
        currency: "USD",
    })
}
