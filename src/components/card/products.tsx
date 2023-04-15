import React from "react"
import { IImages } from "../../interfaces/card"

interface IDabaArray {
    IData: IImages[]
}

interface IProps {
    data: IDabaArray["IData"]
    loanIdChoosen: string | null
    setLoanIdChoosen: React.Dispatch<React.SetStateAction<string | null>>
}

export const Products: React.FC<IProps> = ({
    data = [],
    loanIdChoosen,
    setLoanIdChoosen,
}: IProps) => {
    return (
        <div className="flex gap-3.5">
            {data.map((el) => {
                return (
                    <div
                        key={el.id}
                        className="cursor-pointer rounded-sm"
                        style={el.id === loanIdChoosen ? { borderBottom: "1px solid #ccc" } : {}}
                        onClick={() => setLoanIdChoosen(el.id)}>
                        <img src={el.image} width={70} />
                    </div>
                )
            })}
        </div>
    )
}
