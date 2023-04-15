import React from "react"

interface IProps {
    isCallToActionActive: boolean
}

export const ApplyButton: React.FC<IProps> = ({ isCallToActionActive }: IProps) => {
    return (
        <div className="pt-3 pb-1">
            <button
                className="bg-[#1B31A8] text-white py-4 px-28 rounded-large text-base font-semibold"
                style={
                    !isCallToActionActive ? { backgroundColor: "#888", cursor: "not-allowed" } : {}
                }>
                Apply now
            </button>
        </div>
    )
}
