import React, { ReactElement, useRef, useState } from "react";
import "./App.css";
import { prompts } from "./prompts";
import { DisplayPrompt} from "./components/DisplayPrompt";
import { InputBox } from "./components/InputBox";
import { NewPromptBtn } from "./components/NewPromptBtn";
import { DifficultySelector } from "./components/DifficultySelector";

function App() {
  const [prompt, setPrompt] = useState("Feel free to warm up !");
  const [promptAuthor, setAuthor] = useState("");

  let numberWrong = 0;
  let wordsCorrect = "";
  const promptArr = prompt.split(" ");
  let indexOfCurrentWord = 0;
  let matches: boolean;
  let finishedCurrentWord: boolean;
  let randomPromptsIndex;
  const inputBox = useRef<HTMLInputElement>(null);
  const promptDisplay = useRef<HTMLHeadingElement>(null);
  const difficultySelector = useRef<HTMLSelectElement>(null);

  function handleChange() {
    let userString = inputBox.current?.value;
    let arrToCompare;

    //slices off a section of the prompt to compare the user input to
    if (userString)
      arrToCompare = prompt.slice(0, wordsCorrect.length + userString?.length);

    //determines if the user input thus far matches the corresponding prompt section
    matches = arrToCompare === wordsCorrect + userString;

    //prevents spacebar from clearing the input box when the user input only partially matches the current word
    finishedCurrentWord = userString?.trim() === promptArr[indexOfCurrentWord];

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

        if (promptDisplay.current && numberWrong === 1 && userString) {
          const redPrompt = promptDisplay.current.innerHTML.replace(
            "</span",
            '</span><span style="color:red"'
          );

          promptDisplay.current.innerHTML = redPrompt;
        }
        break;
    }

    //clears the input box when the conditions are met and the user presses spacebar
    document.body.onkeyup = (e) => {
      if (
        e.code === "Space" &&
        matches &&
        finishedCurrentWord &&
        inputBox.current
      ) {
        wordsCorrect += inputBox.current.value;
        inputBox.current.value = "";

        indexOfCurrentWord++;
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
      <div className="flex flex-col gap-8 items-center justify-center h-screen bg-slate-800 text-5xl p-8">
        <div className="flex flex-col gap-8 p-16 bg-slate-600">
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
    </div>
  );
}

export default App;
