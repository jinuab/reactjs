import React, { useEffect, useState } from 'react'

export default function Question({ questions, setDone, ValidationRegex }) {

    //current question state
    const [currentQ, setCurrentQ] = useState(0)

    //answer state
    const [answer, setanswer] = useState('')

    //error state
    const [error, setError] = useState('')


    useEffect(() => {
        //check if question type is dropdown and set first value to the answer state
        if (questions[currentQ]?.type === 'dropdown') {
            setanswer(questions[currentQ]?.options[0])
        }
    }, [currentQ, questions])


    const handleChange = ({ target: { value } }) => {
        //listen to input change and set answer value to state
        setanswer(value)
    }

    const handleNext = () => {
        //current question object
        const currentQObj = questions[currentQ]

        //next question object
        const nextQObj = questions[currentQ + 1]

        //if there is no answer return error
        if (!answer) return setError(`${currentQObj.name} is required`)


        //the current question answer regex for type validation
        const regexObj = ValidationRegex.filter(vr => vr.type === currentQObj.expects)[0]

        if (regexObj?.regex) {
            //check question answer type and if it's mot match return error
            if (!answer.match(regexObj.regex)) {
                return setError(`${currentQObj.name} exepts a ${regexObj.type}`)
            }
        }

        //check if question have a condition
        if (currentQObj?.condition) {
            //check if answer meets the condition requirements if not return error
            if (!currentQObj.condition.c(answer))
                return setError(`${currentQObj.name} should be ${currentQObj.condition.condition_string}`)
        }

        //add answer to the current question object by id and update questions array
        questions.map(q => {
            if (q.id === currentQObj.id) {
                q.answer = answer
            }

            return q
        })

        setError('')
        setanswer('')

        //check if there is any next question
        if (!nextQObj?.q) {
            //if there is no next question directly return done
            return setDone(true)
        }

        //check if the next question requires a previous question answare
        if (!nextQObj?.rerquires_question) {
            //if next question does not require any question move to next question normally  
            return setCurrentQ(currentQ + 1)
        }

        //get prev question answare
        let questionanswer = questions.filter(q => q.id === nextQObj?.rerquires_question?.id)[0].answer

        //if qnsware is correct go to next question
        if (questionanswer === nextQObj?.rerquires_question?.answer) {
            return setCurrentQ(currentQ + 1)
        }

        //if answer is wrong skip next question
        return setCurrentQ(currentQ + 2)
    }

    return (
        <div className='qa'>

            <p className='current-q'> {currentQ + 1} / {questions.length}</p>
            <div className='counter'>
                <div className='inner-counter' style={{ width: `${((currentQ + 1) * 100) / questions.length}%` }}></div>
                <div className='inner-counter-muted'></div>
            </div>


            <p className='question-p'>
                {
                    questions[currentQ].q
                }
            </p>

            <br />

            {
                questions[currentQ].type === 'dropdown'
                    ? <select
                        onChange={handleChange}
                        className={`answer ${error ? 'invalid-answer' : ''}`}
                    >
                        {
                            questions[currentQ].options.map((o, i) => (
                                <option value={o} key={i}>{o}</option>
                            ))
                        }
                    </select>
                    : <input
                        type={questions[currentQ].type}
                        value={answer}
                        className={`answer ${error ? 'invalid-answer' : ''}`}
                        onChange={handleChange}
                    />
            }

            <span className='error'>{error}</span>

            <br />
            <div className='db-container'>
                <button className='dn-btn' onClick={handleNext}>
                    {
                        currentQ + 1 === questions.length ? 'Done' : 'Next'
                    }
                </button>
            </div>
        </div>
    )
}
