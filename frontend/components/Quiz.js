import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, postAnswer, selectAnswer } from './../state/action-creators'

export function Quiz(props) {
  console.log(props)
  useEffect(() => {
    props.fetchQuiz()
  }, [])

  const handleClick = (answer) => {
    props.selectAnswer(answer)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    props.postAnswer(props.quiz.quiz_id, props.selectedAnswer)
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              {
                props.quiz.answers?.map((ans) => 
                <div 
                className={ans.answer_id === props.selectedAnswer ? "answer selected": 'answer'}
                key={ans.answer_id}>
                  {ans.text}
                <button 
                onClick={() => handleClick(ans.answer_id)}>
                  {ans.answer_id === props.selectedAnswer ? "SELECTED": 'selected'}
                </button>
                </div>)
              }
            </div>
            <button 
            id="submitAnswerBtn" 
            onClick={handleSubmit}
            disabled={ props.selectedAnswer.length >= 5 ? false : true}
            >Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (storeState) => {
  return {
    quiz: storeState.quiz,
    selectedAnswer: storeState.selectedAnswer,
  }
}

export default connect(mapStateToProps, { fetchQuiz, postAnswer, selectAnswer })(Quiz)