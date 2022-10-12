interface InputBoxProps{
    inputBox: React.RefObject<HTMLInputElement>
    handleChange: Function
    placeholder: string
}

function InputBox ( {inputBox, handleChange, placeholder}:InputBoxProps ){
    return(
    <input
            type="text"
            ref={inputBox}
            onChange={() => handleChange()}
            className="w-full max-w-sm mx-auto text-2xl"
            placeholder= {placeholder}
    
          />
    )

}

export {InputBox}