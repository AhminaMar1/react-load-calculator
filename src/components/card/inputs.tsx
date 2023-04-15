import React, { useState, useEffect } from "react"
import { isInTheRange, isBigger, isSmaller } from "../../helpers/compare"
import { toNumberOrZero, toLocalPrice } from "../../helpers/convert"
import { IData } from "../../interfaces/card"

interface IProps {
    loan: IData | null
    months: number
    host: string
    setMonths: React.Dispatch<React.SetStateAction<number>>
    setLoanAmount: React.Dispatch<React.SetStateAction<number>>
    setIsCallToActionActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const Inputs: React.FC<IProps> = ({
    loan = null,
    months,
    host,
    setMonths,
    setLoanAmount,
    setIsCallToActionActive,
}: IProps) => {
    const [amountChangable, setAmountChangable] = useState(0)
    const [isTheRangeState, setIsTheRangeState] = useState<boolean>(true)

    const amountChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currency = e.target.value
        var value = Number(currency.replace(/[^0-9.-]+/g, ""))
        const isInRangeBool = isInTheRange(
            value,
            toNumberOrZero(loan?.min_amount),
            toNumberOrZero(loan?.max_amount)
        )

        if (isInRangeBool) {
            setLoanAmount(value)
        }
        setIsTheRangeState(isInRangeBool)
        setAmountChangable(value)
    }

    const keyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e
        if (key === "ArrowUp") {
            increaseEvent()
        }
        if (key === "ArrowDown") {
            decreaseEvent()
        }
    }

    const increaseEvent = () => {
        if (isSmaller(months, toNumberOrZero(loan?.max_tenure))) {
            setMonths((m) => ++m)
        }
    }

    const decreaseEvent = () => {
        if (isBigger(months, toNumberOrZero(loan?.min_tenure))) {
            setMonths((m) => --m)
        }
    }

    useEffect(() => {
        setAmountChangable(toNumberOrZero(loan?.min_amount))
        setIsTheRangeState(true)
    }, [loan])

    useEffect(() => {
        setIsCallToActionActive(isTheRangeState)
    }, [isTheRangeState])

    if (!loan) {
        return null
    }
    const amount = amountChangable.toLocaleString("us-US", {
        minimumFractionDigits: 0,
    })

    return (
        <div className="flex gap-2 sm:gap-4 w-full box-border flex-col sm:flex-row">
            <div className="flex flex-col gap-1 w-full sm:w-3/5 ">
                <label className="text-base text-[#1E2A32] mt-4 sm:mt-0">Loan amount</label>
                <input
                    className="w-full border sp-border-color h-14 rounded sp-text-sec text-2xl font-bold pl-12"
                    style={!isTheRangeState ? { color: "red" } : {}}
                    placeholder="0"
                    defaultValue="0"
                    value={amount}
                    onChange={(e) => amountChangeHandle(e)}
                />
                <span className="-mt-14 h-10 flex flex-col justify-center text-[#CBD5DC] px-5 text-2xl font-medium pt-2 w-1">
                    $
                </span>
                {!isTheRangeState && (
                    <div className="mt-3">
                        <div
                            className="fixed bg-[#494547] px-4 py-2 text-[#f0ebeb] rounded-lg"
                            role="alert">
                            <p>
                                {`Between ${toLocalPrice(
                                    toNumberOrZero(loan?.min_amount),
                                    0,
                                    2
                                )} and ${toLocalPrice(toNumberOrZero(loan?.max_amount), 0, 2)}`}
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-1 w-full sm:w-2/5">
                <label className="text-base text-[#1E2A32] mt-4 sm:mt-0">Number of Months</label>
                <input
                    className="w-full border sp-border-color h-14 rounded sp-text-sec text-lg text-center"
                    value={months}
                    placeholder="0"
                    defaultValue="0"
                    onKeyDown={(e) => keyDownEvent(e)}
                />
                <div className="sp-arrow-container w-full flex items-center justify-between py-0 px-1.5">
                    <button className="text-[#8A9CA9] text-xl" onClick={decreaseEvent}>
                        <img src={host + "/leftArrow.svg"} />
                    </button>
                    <button className="text-[#8A9CA9] text-xl" onClick={increaseEvent}>
                        <img src={host + "/rightArrow.svg"} />
                    </button>
                </div>
            </div>
        </div>
    )
}
