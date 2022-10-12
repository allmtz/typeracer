import React, { useRef, useState } from "react";
import "./App.css";
import { prompts } from "./prompts";
import { DisplayPrompt } from "./components/DisplayPrompt";
import { InputBox } from "./components/InputBox";
import { NewPromptBtn } from "./components/NewPromptBtn";
import { DifficultySelector } from "./components/DifficultySelector";

function App() {
  const [prompt, setPrompt] = useState(
  'Warm up by matching this text in the box below or select a difficulty and click "New Prompt"'
  );
  const [promptAuthor, setAuthor] = useState("Allan");
  const [indexOfCurrentWord, setIndexOfCurrentWord] = useState(0)
  const [wpm, setWpm] = useState('0')
  const [wordsCorrect,setWordsCorrect] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const wordsCompleted = useRef(0)
  const secondsElapsed = useRef(0)

  let numberWrong = 0;
  const promptArr = prompt.split(" ");
  let matches: boolean;
  let finishedCurrentWord: boolean;
  let randomPromptsIndex;
  let playing = false
  let startTime:Date
  let arrToCompare: null | string = null;

  const inputBox = useRef<HTMLInputElement>(null);
  const promptDisplay = useRef<HTMLHeadingElement>(null);
  const difficultySelector = useRef<HTMLSelectElement>(null);


  function handleChange() {
    // changes the input box display if the prompt is matched 
    if(wordsCorrect === prompt){
      inputBox.current!.value = ''
      inputBox.current!.readOnly = true
      setPlaceholder('Nice job! Try a different prompt?')
      return
    }
    else{
      let userString = inputBox.current?.value;

    if(!playing){
      playing = true

      startTime = new Date()
    }

    //slices off a section of the prompt to compare the user input to
    if (userString)
      arrToCompare = prompt.slice(0, wordsCorrect.length + userString?.length);

    //determines if the user input thus far matches the corresponding prompt section
    matches = arrToCompare?.trim() === (wordsCorrect + userString).trim();

    //prevents spacebar from clearing the input box when the user input only partially matches the current word
    finishedCurrentWord =
      userString?.trim() === promptArr[indexOfCurrentWord].trim();
    //adds the green color to the prompt if the user input matches, adds the red color if user input does not match the prompt
    switch (matches) {
      case true:
        numberWrong = 0;
        if (promptDisplay.current && userString) {
          const greenPrompt = `<span style='color:#22c55e'>${[
            wordsCorrect + userString,
          ]}</span>${prompt.slice(wordsCorrect.length + userString.length)}`;

          if (greenPrompt) promptDisplay.current.innerHTML = greenPrompt;
        }

        break;

      case false:
        numberWrong++;
        let redPrompt;
        if (promptDisplay.current && numberWrong !== 0) {
          if (userString?.length !== 0) {
            redPrompt = promptDisplay.current.innerHTML.replace(
              "</span>",
              `<span style='color:red'>`
            );
          } else {
            redPrompt = promptDisplay.current.innerHTML.replace(
              `${promptArr[indexOfCurrentWord][0]}</span>`,
              `<span style='color:red'>${promptArr[indexOfCurrentWord][0]}`
            );
          }

          promptDisplay.current.innerHTML = redPrompt;
        }
        break;
    }

    //clears the input box when the conditions are met and the user presses spacebar, adds the word that was cleared to the wordsCorret string, calculates the current wpm based on the words completed and the time elapsed
    document.body.onkeydown = (e) => {
      if (
        e.code === "Space" &&
        matches &&
        finishedCurrentWord &&
        inputBox.current &&
        inputBox.current?.value.trim().length !== 0
      ) {
        // indexOfCurrentWord is used to keep track of what word the user needs to match 
          setIndexOfCurrentWord(indexOfCurrentWord + 1)


        setWordsCorrect( wordsCorrect + inputBox.current.value)

        inputBox.current.value = "";

      wordsCompleted.current++

       
      const currentTime = new Date()  

      secondsElapsed.current = secondsElapsed.current + Math.abs(Number(currentTime) - Number(startTime)) / 1000
      const wpm = String(( (wordsCompleted.current / secondsElapsed.current) * 60 ).toFixed(0))
      
      setWpm(wpm)
    
      }
      return
    };
    }   
  }

  //used to randomly select a prompt
  function getRandomIndex(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //render a new prompt based on the difficulty selected
  function getPrompt() {
    let difficulty = difficultySelector.current?.value;
    if (inputBox.current) inputBox.current.value = "";

    // reseting all the variables
    setWordsCorrect('')
    setIndexOfCurrentWord(0)
    setWpm('0')
    secondsElapsed.current = 0
    wordsCompleted.current = 0
    playing = false
    setPlaceholder('')
    inputBox.current!.readOnly = false

    switch (difficulty) {
      case "easy":
        randomPromptsIndex = getRandomIndex(0, prompts.easy.length - 1);
        setPrompt(prompts.easy[randomPromptsIndex].prompt);
        setAuthor(prompts.easy[randomPromptsIndex].author);
        break;

      case "medium":
        randomPromptsIndex = getRandomIndex(0, prompts.medium.length - 1);
        setPrompt(prompts.medium[randomPromptsIndex].prompt);
        setAuthor(prompts.medium[randomPromptsIndex].author);
        break;

      case "hard":
        randomPromptsIndex = getRandomIndex(0, prompts.hard.length - 1);
        setPrompt(prompts.hard[randomPromptsIndex].prompt);
        setAuthor(prompts.hard[randomPromptsIndex].author);
        break;
    }
    //used to get rid of any text color on the current prompt in case it is randomly selected to be displayed again
    promptDisplay.current!.innerHTML = prompt 

  }

  return (
    <div>

      <div className="text-white text-xl text-end pr-4" >{wpm} wpm</div>

      <div className="flex flex-col gap-8 p-9 bg-slate-600 w-screen max-w-3xl text-3xl sm:text-xl sm:px-4">
        <DisplayPrompt
          promptDisplay={promptDisplay}
          prompt={prompt}
          promptAuthor={promptAuthor}
        />

        <InputBox inputBox={inputBox} handleChange={handleChange} placeholder = {placeholder} />

        <DifficultySelector difficultySelector={difficultySelector} />

        <NewPromptBtn getPrompt={getPrompt} />
      </div>
    </div>
  );
}

export default App;
