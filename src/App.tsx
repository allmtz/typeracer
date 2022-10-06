import React, { useRef, useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState(
    "This omething else to se how it workss is how it works le;s se 1232 "
  );
  let numberWrong = 0;
  let wordsCorrect = "";
  let matches: boolean;
  const promptArr = prompt.split(" ");
  let indexOfCurrentWord = 0;
  let finishedCurrentWord: boolean;
  const inputBox = useRef<HTMLInputElement>(null);
  const promptDisplay = useRef<HTMLHeadingElement>(null);

  function handleChange() {
    let userString = inputBox.current?.value;
    let arrToCompare;

    //slices off a section of the prompt to compare the user input to
    if (userString)
      arrToCompare = prompt.slice(0, wordsCorrect.length + userString?.length);

    //determines if the user input thus far matches the corresponding prompt section
    matches = (arrToCompare === wordsCorrect + userString)

    //prevents spacebar from clearing the input box when the user input only partially matches the current word
    finishedCurrentWord = (userString?.trim() === promptArr[indexOfCurrentWord])

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

  return (
    <div>
      <div className="flex flex-col gap-8 items-center justify-center h-screen bg-slate-500 text-5xl">
        <h1 ref={promptDisplay} className="text-gray-50">
          {prompt}
        </h1>
        <input type="text" ref={inputBox} onChange={() => handleChange()} />
      </div>
    </div>
  );
}

export default App;
