import React from "react"
import { toLocalPrice } from "../../helpers/convert"

interface IProps {
    months: number
    amount: number
    interest: number
}

export const MonthlyInfo: React.FC<IProps> = ({ months, amount, interest }: IProps) => {
    const total = amount * (interest + 1)
    const monthlyInst = total / months

    const dNow = new Date()
    // plus months
    dNow.setMonth(dNow.getMonth() + months)
    const dateReach = dNow.toLocaleString("en-US", { month: "short", year: "numeric" })

    return (
        <div className="flex flex-col w-full border sp-border-color rounded sp-text-sec">
            <div className="flex flex-row justify-between w-full p-8">
                <h3 className="text-xl leading-6">Monthly amount</h3>
                <h3 className="text-[#0079FF] font-bold text-3xl leading-6">
                    {toLocalPrice(monthlyInst, 2, 2)}
                </h3>
            </div>
            <div className="flex flex-row w-full bg-[#f4f8fa] px-8 py-6">
                <p>
                    You’re planning {months} <b>monthly deposits</b> to reach your{" "}
                    <b>{toLocalPrice(amount, 0, 0)}</b> goal by
                    <b> {dateReach}</b>. total amount loaned will be{" "}
                    <b>{toLocalPrice(total, 0, 0)}</b>
                </p>
            </div>
        </div>
    )
}
