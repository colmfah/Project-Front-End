import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
var QRCode = require('qrcode.react')


class ShowQRCode extends React.Component {

	state = {

	}


componentDidMount(){

}

	render() {



	  return (
			<>
				<QRCode value={this.props.match.params.id} />

				<h1>{this.props.match.params.id}</h1>
			</>
		)
}
}

export default ShowQRCode
