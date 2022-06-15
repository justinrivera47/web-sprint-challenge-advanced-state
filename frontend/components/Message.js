import React from 'react'
import {connect} from 'react-redux'

export function Message(props) {
  return <div id="message">{props.infoMessage}</div>
}

const mapStateToProps = (storeState) => {
  return {
    infoMessage: storeState.infoMessage
  }
}

export default connect(mapStateToProps)(Message)