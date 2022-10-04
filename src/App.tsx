import React, { useRef } from "react";
import "./App.css";

function App() {
  const samplePrompt =
    "This is a test ! that got longer lets see how it looks this is how it works le;s se 1232";
  const promptArray = samplePrompt.split("");
  let numberWrong = 0;

  const inputBox = useRef<HTMLInputElement>(null);
  const promptDisplay = useRef<HTMLHeadingElement>(null);

  function handleChange() {
    const localPromptArray = [...promptArray];
    let userString: string = "";

    if (inputBox.current !== null) {
      userString = inputBox.current["value"];
      let matches: boolean;

      let arrToCompare = samplePrompt.slice(0, userString.length);

      arrToCompare === userString ? (matches = true) : (matches = false);

      switch (matches) {
        case true:
          numberWrong = 0;
          if (promptDisplay.current) {
            const promptReplacement = `<span style='color:rgb(34 197 94)'>${[
              ...Array(userString),
            ]}</span>${samplePrompt.slice(userString.length)}`;
            promptDisplay.current.innerHTML = promptReplacement;

          }

          break;

        case false:
          numberWrong++;

          if (promptDisplay.current && numberWrong === 1) {
            const promptReplacement = `<span style='color:rgb(34 197 94)'>${[
              samplePrompt.slice(0, userString.length - 1),
            ]}</span><span style='color:red'>${samplePrompt.slice(
              userString.length -1
            )}</span>`;
            promptDisplay.current.innerHTML = promptReplacement;

            console.log(promptReplacement)
          }
          break;
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-8 items-center justify-center h-screen bg-slate-500 text-5xl">
        <h1 ref={promptDisplay} className="text-gray-50">
          {samplePrompt}
        </h1>
        <input type="text" ref={inputBox} onChange={() => handleChange()} />
      </div>
    </div>
  );
}

export default App;
