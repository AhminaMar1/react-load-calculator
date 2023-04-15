import React from "react"
import ReactDOM from "react-dom"
import Title from "@components/title"
import CardContainer from "@components/card"

import "./index.css"

const App = () => (
    <div className="app w-full h-full flex flex-col items-center pt-16 xl:pt-24 gap-6 bg-[#f4f8fa]">
        <Title />
        <CardContainer />
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"))
