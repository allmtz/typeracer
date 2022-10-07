interface DifficultySelectorProps{
    difficultySelector: React.RefObject<HTMLSelectElement>
}

function DifficultySelector({difficultySelector}:DifficultySelectorProps){
    return(
        <div className="flex flex-row gap-4 items-center justify-center">
        <label htmlFor="difficulty">Difficulty :</label>
          <select ref={difficultySelector} name="difficulty" id="difficulty" className="w-min px-2">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          </div>
    )
}

export {DifficultySelector}