import React, {useState, useEffect} from 'react';
import bem from 'bembo'
import data from './items';
import  './styles/partials/_translator.scss';
import Button from './ui/Button';

const b = bem('card')
function rand(max) {
    return Math.floor(Math.random() * max);
}

function randRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


const Translator = () =>  {
    const levels = [0, 1, 2];
    const levelData = data.filter(tr=> levels.includes(tr.knowledgeLevel))
    const [exercise, setExercise] = useState(null);
    const [hidden, setHidden] = useState(true);

    const getNextExercise = ()  => {
        setHidden(true)
        setExercise(levelData[rand(levelData.length)])
    }
    useEffect(() => {
        setExercise(levelData[rand(levelData.length)])
    }, [])

    if (!exercise) return null;
    return (
        <div className="container">
            <div key={exercise.id}  className={b}>
                <div className={b.e('word')}>
                    {exercise.learnLanguageText}
                </div>
                <div className={b.e('word', {hidden})}>
                    {exercise.displayLanguageText}
                </div>
                <div className={b.e('buttons')}>
                    <Button variant='outline' onClick={() => setHidden(false)} label='Reveal' disabled={!hidden}/>
                    <Button onClick={getNextExercise} label='Next'/>
                </div>
            </div>
        </div>
    )
}

export default Translator;
