import React, { useState, useEffect } from "react"
import { Products } from "./products"
import { Inputs } from "./inputs"
import { MonthlyInfo } from "./monthlyInfo"
import { ApplyButton } from "./callToAction"
import { toNumberOrZero } from "../../helpers/convert"
import { IData } from "../../interfaces/card"

interface IDabaArray {
    IData: IData[]
}
const host = "http://localhost:5001"

export default function CardContainer() {
    const [data, setData] = useState<IDabaArray["IData"] | []>([])
    const [loanIdChoosen, setLoanIdChoosen] = useState<string | null>(null)
    const [loan, setLoan] = useState<IData | null>(null)
    const [months, setMonths] = useState(0)
    const [loanAmount, setLoanAmount] = useState(0)
    const [isCallToActionActive, setIsCallToActionActive] = useState<boolean>(true)

    useEffect(() => {
        fetch(`${host}/products.json`)
            .then((r) => r.json())
            .then((data: IDabaArray["IData"]) => {
                setData(data)
                setLoanIdChoosen(data[0].id)
            })
    }, [])

    useEffect(() => {
        const loan = loanIdChoosen ? data.find((el) => el.id === loanIdChoosen) || null : null
        setLoan(loan)
        const nMonths = loan?.min_tenure ? parseInt(loan?.min_tenure) : 0
        const nAmount = loan?.min_amount ? parseInt(loan?.min_amount) : 0
        setMonths(nMonths)
        setLoanAmount(nAmount)
    }, [loanIdChoosen])

    const productsData = data.map((el) => ({ id: el.id, image: el.image }))
    const interest = toNumberOrZero(loan?.interest)
    return (
        <div className="flex flex-col items-center gap-6 max-w-screen-md w-full sm:w-2/3 lg:w-2/4 xl:w-2/5 bg-white rounded-lg sp-shadow pt-6 pb-10 px-10 box-border">
            <Products
                data={productsData}
                loanIdChoosen={loanIdChoosen}
                setLoanIdChoosen={setLoanIdChoosen}
            />
            <Inputs
                loan={loan}
                months={months}
                setMonths={setMonths}
                setLoanAmount={setLoanAmount}
                setIsCallToActionActive={setIsCallToActionActive}
                host={host}
            />
            <MonthlyInfo months={months} amount={loanAmount} interest={interest} />
            <ApplyButton isCallToActionActive={isCallToActionActive} />
        </div>
    )
}
