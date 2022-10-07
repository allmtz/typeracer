interface DifficultySelectorProps{
    difficultySelector: React.RefObject<HTMLSelectElement>
}

function DifficultySelector({difficultySelector}:DifficultySelectorProps){
    return(
        <>
        <label htmlFor="difficulty">Choose a difficulty : </label>
          <select ref={difficultySelector} name="difficulty" id="difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          </>
    )
}

export {DifficultySelector}