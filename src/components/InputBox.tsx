interface InputBoxProps{
    inputBox: React.RefObject<HTMLInputElement>
    handleChange: Function

}

function InputBox ( {inputBox, handleChange}:InputBoxProps ){
    return(
    <input
            type="text"
            ref={inputBox}
            onChange={() => handleChange()}
            className="w-full max-w-4xl"
          />
    )

}

export {InputBox}