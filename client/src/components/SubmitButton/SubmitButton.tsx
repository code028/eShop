import React from "react"

interface ISubmitButton {
    children?: JSX.Element | JSX.Element[],
    style?: string,
    disabled?: boolean
}

const SubmitButton: React.FC<ISubmitButton> = ({children, style, disabled = false}) => {
  return (
    <div className="w-full mt-5 flex justify-center">
        <button type="submit" className={"w-1/2 bg-black text-white py-2 px-4 rounded-md " + style} disabled={disabled}>
          {children || "No name"}
        </button>
    </div>
  )
}

export default SubmitButton