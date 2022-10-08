import React, { ReactElement, useRef, useState } from "react";
import "./App.css";
import { prompts } from "./prompts";
import { DisplayPrompt } from "./components/DisplayPrompt";
import { InputBox } from "./components/InputBox";
import { NewPromptBtn } from "./components/NewPromptBtn";
import { DifficultySelector } from "./components/DifficultySelector";

function App() {
  const [prompt, setPrompt] = useState(
    "Warm up by matching this text in the box below or go ahead and load a prompt"
  );
  const [promptAuthor, setAuthor] = useState("Allan");

  let numberWrong = 0;
  let wordsCorrect = "";
  const promptArr = prompt.split(" ");
  let indexOfCurrentWord = 0;
  let matches: boolean;
  let finishedCurrentWord: boolean;
  let randomPromptsIndex;
  let playing = false
  let startTime:Date
  let secondsElapsed
  let endTime:Date
  let arrToCompare: null | string = null;

  const inputBox = useRef<HTMLInputElement>(null);
  const promptDisplay = useRef<HTMLHeadingElement>(null);
  const difficultySelector = useRef<HTMLSelectElement>(null);

  let wordsCompleted = 0

  function handleChange() {
    let userString = inputBox.current?.value;

    if(!playing){
      playing = true

      startTime = new Date()

      console.log('started playing: ',startTime)
    }

    //slices off a section of the prompt to compare the user input to
    if (userString)
      arrToCompare = prompt.slice(0, wordsCorrect.length + userString?.length);

    //determines if the user input thus far matches the corresponding prompt section
    matches = arrToCompare?.trim() === (wordsCorrect + userString).trim();

    //prevents spacebar from clearing the input box when the user input only partially matches the current word
    finishedCurrentWord =
      userString?.trim() === promptArr[indexOfCurrentWord].trim();

    if( wordsCorrect + userString === prompt && userString?.length !== 0 ){ 
      // playing = false
      endTime = new Date()  

      secondsElapsed = Math.abs(Number(endTime) - Number(startTime)) / 1000
      const wpm = ((wordsCompleted / secondsElapsed) * 60).toFixed(0)
      
      console.log('you finished: ', endTime, `${secondsElapsed}s`, `${wpm} wpm`)
    
    }
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

    //clears the input box when the conditions are met and the user presses spacebar
    document.body.onkeydown = (e) => {
      if (
        e.code === "Space" &&
        matches &&
        finishedCurrentWord &&
        inputBox.current &&
        inputBox.current?.value !== ""
      ) {
        wordsCorrect += inputBox.current.value;
        inputBox.current.value = "";

        wordsCompleted++

        if(wordsCorrect === prompt){
          return
        }
        else{
          indexOfCurrentWord++
        }
      }
    };
  }

  //used to randomly select a prompt
  function getRandomIndex(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //render a new prompt based on the difficulty selected
  function getPrompt() {
    let difficulty = difficultySelector.current?.value;
    if (inputBox.current) inputBox.current.value = "";

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
  }

  return (
    <div>

      <div className="text-white text-end pr-4"> wpm goes here</div>

      <div className="flex flex-col gap-8 p-9 bg-slate-600 w-screen max-w-3xl text-3xl sm:text-xl sm:px-4">
        <DisplayPrompt
          promptDisplay={promptDisplay}
          prompt={prompt}
          promptAuthor={promptAuthor}
        />

        <InputBox inputBox={inputBox} handleChange={handleChange} />

        <DifficultySelector difficultySelector={difficultySelector} />

        <NewPromptBtn getPrompt={getPrompt} />
      </div>
    </div>
  );
}

export default App;
