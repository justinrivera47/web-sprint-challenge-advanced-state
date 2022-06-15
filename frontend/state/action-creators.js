import axios from "axios"
import * as type from "./action-types"

const URL = 'http://localhost:9000/api/quiz/next'

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return {type: type.MOVE_CLOCKWISE}
 }

export function moveCounterClockwise() {
  return {type: type.MOVE_COUNTERCLOCKWISE}
 }

export function selectAnswer(answer) { 
  return {type: type.SET_SELECTED_ANSWER, payload: answer}
}

export function setMessage(message) { 
  return {type: type.SET_INFO_MESSAGE, payload: message}
}

export function setQuiz(quiz) { 
  return {type: type.SET_QUIZ_INTO_STATE, payload: quiz}
}

export function inputChange(change) { 
  return {type: type.INPUT_CHANGE, payload: change}
}

export function resetForm() {
  return {type: type.RESET_FORM}
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get(URL)
    .then(res => {
      dispatch(setQuiz(res.data))
      dispatch(selectAnswer(res.data.answers))
    })
    .catch(err => {
      dispatch(setMessage(err.response.data.error))
    })
  }
}
export function postAnswer(question, answer) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post('http://localhost:9000/api/quiz/answer', 
    {
      quiz_id: question, 
      answer_id: answer
    })
    .then(res => {
      dispatch(setMessage(res.data.message))
      dispatch(fetchQuiz())
    })
    .catch(err => {
      dispatch(setMessage(err.response.data.message))
    })
  }
}

export function postQuiz({newQuestion, newTrueAnswer, newFalseAnswer}) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post("http://localhost:9000/api/quiz/new", {
      question_text: newQuestion,
      true_answer_text: newTrueAnswer,
      false_answer_text: newFalseAnswer
    })
    .then(res => {
      console.log(res)
      dispatch(setMessage('Congrats: "'+ res.data.question + '" is a great question!'))
      dispatch(resetForm())
    })
    .catch(err => {
      dispatch(setMessage(err.response.data.message))
    })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
