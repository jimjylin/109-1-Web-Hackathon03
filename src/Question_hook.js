import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { set } from 'mongoose'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function Question() {
  const [complete, setComplete] = useState(false)  // true if answered all questions
  const [contents, setContents] = useState([])     // to store questions
  const [ans, setAns] = useState([])               // to record your answers
  const [score, setScore] = useState(0)            // Your score
  const [current_question, setCurrentQuestion] = useState(0) // index to current question
  const [cur_option, setCurOption] = useState(-1)
  const next = () => {
    if(current_question<contents.length-1){
      setCurrentQuestion(current_question+1)
      setCurOption(-1)
    }
    else{
      getAns()
    }
    
    
    

    // TODO : switch to the next question,
    // and check answers to set the score after you finished the last question
  }
  const getAns = async () => {
    const {
      data: { message, score }
    } = await instance.post('/checkAns', { params: { ans } })
    setScore(score)
    setComplete(true)
    // TODO : get questions from backend
  }
  const choose = (e) => {
    let cur_ans = ans
    cur_ans[current_question] = Number(e.target.value)
    setAns(cur_ans)
    setCurOption(e.target.value)
    
    // TODO : update 'ans' for the option you clicked
  }

  const getQuestions = async () => {
    const {
      data: { message, contents }
    } = await instance.get('/getContents')
    setContents(contents)

    // TODO : get questions from backend
  }

  useEffect(() => {
    if (!contents.length)
      getQuestions()
    
    
  })
  // TODO : fill in the rendering contents and logic
  console.log(ans)
  return (
    
    <div id="quiz-container">
      {contents.length ?
        <React.Fragment>
          <div id="question-box">
            <div className="question-box-inner">
              Question {current_question+1} of {contents.length}
            </div>
          </div>

          <div id="question-title">
            {complete?'Your Score : ' + String(score) +' / ' + String(contents.length):contents[current_question].question}
          </div>

          <div id="options" style={{visibility : complete ? "hidden": "visible"}}>
            {
              contents[current_question].options.map((option, i) => (
                <label><div className="each-option">
                  <input
                    type="radio" 
                    id={'q'+String(current_question+1)+'_'+String(i+1)}
                    //name={'Q'+String(current_question+1)}
                    value={i+1}
                    checked = {i + 1 == cur_option}
                    onChange={choose}
                  />
                  <span>{option}</span>
                </div></label>
              ))
            }
          </div>
          
          <div id="actions" onClick={next} style={{visibility : complete ? "hidden": "visible"}}>
            NEXT
          </div>
        </React.Fragment>
        : <React.Fragment></React.Fragment>
      }
    </div>
  )
}

export default Question
