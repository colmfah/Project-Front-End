import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import QrReader from 'react-qr-reader'

class CheckIn extends React.Component {

	state = {

	}


	render() {

	  return (
			<>
				<h1>Check In</h1>
				<p>{this.props.location.user.name}</p>
			</>
		)
}
}

export default CheckIn
