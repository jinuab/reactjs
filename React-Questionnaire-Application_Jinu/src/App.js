import React, { useState } from 'react';
import { questions, ValidationRegex } from './data'
import Question from './components/Question';
import './App.css';
import NavBar from './components/NavBar';

export default function App() {
  const [done, setDone] = useState(false)


  return (
    <div className='app'>
      <NavBar />

      {
        done
          ? <div className="success-msg">
            <img src='./green.jpg' alt='success checkmark' />
            <h2 >Thank you.</h2>
            <p>You've successfully answered all the questions.</p>
          </div>

          : <Question
            questions={questions}
            ValidationRegex={ValidationRegex}
            setDone={setDone}
          />

      }

    </div>
  );
}

