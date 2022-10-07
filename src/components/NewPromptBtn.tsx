interface NewPromptBtnProps{
    getPrompt: Function
}

function NewPromptBtn( {getPrompt}:NewPromptBtnProps ){
    return(
        <button
            onClick={() => getPrompt()}
            className="bg-slate-200 p-4 max-w-lg mx-auto hover:bg-amber-300"
          >
            New Prompt
          </button>
    )
}

export {NewPromptBtn}