import React from 'react'
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
