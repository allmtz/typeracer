import { match } from "assert";
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
    arrToCompare === wordsCorrect + userString
      ? (matches = true)
      : (matches = false);

    //prevents spacebar from clearing the input box when the user input only partially matches the current word
    userString?.trim() === promptArr[indexOfCurrentWord]
      ? (finishedCurrentWord = true)
      : (finishedCurrentWord = false);

    switch (matches) {
      case true:
        // let promptReplacement;
        // numberWrong = 0;
        // if (promptDisplay.current) {
        //   if (wordsCorrect === "") {
        //     promptReplacement = `<span style='color:#22c55e'>${[
        //       userString,
        //     ]}</span>${prompt.slice(userString?.length)}`;
        //   } else {
        //     if (userString) {
        //       promptReplacement = `<span style='color:#22c55e'>${[
        //         wordsCorrect + userString,
        //       ]}</span>${prompt.slice(
        //         wordsCorrect.length + userString?.length
        //       )}`;
        //     }
        //   }

        //   if (promptReplacement)
        //     promptDisplay.current.innerHTML = promptReplacement;
        // }

        let promptReplacement;
        numberWrong = 0;
        if (promptDisplay.current && userString) {
            // if (userString) {
              promptReplacement = `<span style='color:#22c55e'>${[
                wordsCorrect + userString,
              ]}</span>${prompt.slice(
                wordsCorrect.length + userString.length
              )}`;
            // }
          

          if (promptReplacement)
            promptDisplay.current.innerHTML = promptReplacement;
        }

        break;

      case false:
        numberWrong++;

        if (promptDisplay.current && numberWrong === 1 && userString) {
          const promptReplacement = promptDisplay.current.innerHTML.replace(
            "</span",
            '</span><span style="color:red"'
          );

          promptDisplay.current.innerHTML = promptReplacement;
        }
        break;
    }

    document.body.onkeydown = function (e) {
      if (e.code === "Space" && matches && finishedCurrentWord) {
        wordsCorrect += inputBox.current?.value;
        if (inputBox.current) inputBox.current.value = "";

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
