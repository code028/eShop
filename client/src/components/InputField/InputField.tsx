
interface IInputField {
    id: string,
    type?: string,
    placeholder?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    disabled?: boolean
    style?: string
    children?: JSX.Element | JSX.Element[]
}

const InputField: React.FC<IInputField> = ({id, type, placeholder, value, onChange, required = true, disabled, style, children}) => {
  return (
    <>
      <input 
          id={id}
          type={type || "text"} 
          placeholder={placeholder} 
          value={value} 
          onChange={onChange} 
          required={required}
          disabled={disabled}
          autoComplete="off"
          spellCheck="false"
          className={"w-full py-2 px-4 bg-white rounded-md m-4 border-2 border-slate-400 outline-none" + style}
      />
      <div className="w-full -mt-4 pl-2 text-sm text-red-500">
        {children}
      </div>
    </>
  )
}

export default InputField