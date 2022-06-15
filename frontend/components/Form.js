import React from 'react'
import { connect } from 'react-redux'
import { postQuiz, inputChange, resetForm } from '../state/action-creators'
//import * as actionCreators from '../state/action-creators'

export function Form(props) {
  console.log(props)

  const onChange = evt => {
    const {id, value} = evt.target
    props.inputChange({id, value})
  }

  const onSubmit = evt => {
    evt.preventDefault()
    props.postQuiz(props.form)
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input 
      maxLength={50} 
      onChange={onChange} 
      id="newQuestion" 
      value={props.form.newQuestion} 
      placeholder="Enter question" />

      <input 
      maxLength={50} 
      onChange={onChange} 
      id="newTrueAnswer" 
      value={props.form.newTrueAnswer} 
      placeholder="Enter true answer" />

      <input 
      maxLength={50} 
      onChange={onChange} 
      id="newFalseAnswer" 
      value={props.form.newFalseAnswer} 
      placeholder="Enter false answer" />

      <button id="submitNewQuizBtn" 
      disabled={
        !props.form.newQuestion.trim().length > 0||
        !props.form.newTrueAnswer.trim().length > 0||
        !props.form.newFalseAnswer.trim().length > 0
        }
        >Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = storeState => {
  return { 
    form: storeState.form,
    infoMessage: storeState.infoMessage
  }
}

export default connect(mapStateToProps, {postQuiz, inputChange, resetForm})(Form)