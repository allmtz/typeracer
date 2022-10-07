
interface DiplayPromptProps{
    promptDisplay:React.RefObject<HTMLHeadingElement>,
    prompt:string,
    promptAuthor:string
  }


  function DisplayPrompt ( {promptDisplay,prompt,promptAuthor}:DiplayPromptProps ){
    return(
      <div>
         <h1
            ref={promptDisplay}
            className="text-gray-50 max-w-6xl leading-tight"
          >
            {prompt}
          </h1>
          <h1>{promptAuthor}</h1> 
      </div>
    )
  }


export {DisplayPrompt}



