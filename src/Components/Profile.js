import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import moment from "moment"
import {Link} from 'react-router-dom'
import QrReader from 'react-qr-reader'

class Profile extends React.Component {

	state = {
		user: {
			email: '',
			location: '',
			name: '',
			_id: '',
			ticketsBought: [],
			usersEvents: []
		}
	}

	componentDidMount(){

		let token = localStorage.getItem('token')
		let objectToSend = {
			token: token
			}
			console.log('sent', objectToSend)
		axios.post(`http://localhost:4000/profile`, objectToSend)
			.then( res => {
				console.log('res', res.data)
					this.setState({
						user: res.data
					})
				})
			.catch(err => console.log(err))
	}

	turnScannerOnOff = (usersEvent) =>{
		let stateCopy = this.state.user.usersEvents
		stateCopy.map(	e => {
			if(e._id === usersEvent._id){
				e.checkIn = (!e.checkIn)
				return e
			}
			this.setState({
				usersEvents: stateCopy
			})
		}	)
}

handleScan = (data, usersEvent) => {

if (data) {
	this.turnScannerOnOff(usersEvent)

	let stateCopy = this.state.user.usersEvents
	stateCopy.map(	e => {
		if(e._id === usersEvent._id){
			e.message = 'QR code scanned. Checking database for match...'
			return e
		}
		this.setState({
			usersEvents: stateCopy
		})
	}	)


	axios.post(`http://localhost:4000/checkIn`, {
		qrcode: data,
		eventid: usersEvent._id
	})
		.then(res => {

			let stateCopy = this.state.user.usersEvents
			stateCopy.map(	e => {
				if(e._id === usersEvent._id){
					e.message = res.data
					return e
				}
				this.setState({
					usersEvents: stateCopy
				})
			}	)
		}
 )
		.catch(err => {console.log(err)})


}
}

handleError = err => {
console.error(err)
}


	render() {

	  return (
			<>
				<div>{this.state.user.name}</div>
				<div>{this.state.user.location}</div>
				<div>{this.state.user.email}</div>
				<h2>Tickets Purchased for Upcoming Events</h2>
				<div> {this.state.user.ticketsBought.map(	(e, i) => {return (

					<div key={i}>

					<div>{i+1}</div>
					<div>{e.event.title}</div>
					<div>{e.event.location}</div>
					<div>Begins: {moment(e.event.startDetails).format('DD MMMM YYYY HH:mm')}</div>
					<div>Ends: {moment(e.event.endDetails).format('DD MMMM YYYY HH:mm')}</div>

					<Link to={`/qr/${e.randomNumber}`}>
					Click here to access your QR code to enter the event
					</Link>
					<hr />

					</div>

				)}	)}</div>

				<h2>Events you are organising</h2>
				{this.state.user.usersEvents.map(	(e,i) => { return (<div key={i}>
					<div>{i+1}</div>
					<div>{e.title}</div>
					<div>{e.location}</div>
					<div>Begins: {moment(e.startDetails).format('DD MMMM YYYY HH:mm')}</div>
					<div>Ends: {moment(e.endDetails).format('DD MMMM YYYY HH:mm')}</div>
					<div>Tickets Sold: {e.ticketsSold.length}</div>
					<div>Tickets Remaining: {e.ticketNo - e.ticketsSold.length}</div>

					<div>{e.message}</div>
					{<div>
						{e.checkIn ? (
							<div>
								<button onClick={() =>this.turnScannerOnOff(e)}>Turn Check In On/Off</button>
								<QrReader
								delay={300}
								onError={this.handleError}
								onScan={(event) => this.handleScan(event, e)}
								style={{ width: '100%' }}
								/>
							</div>

						) : (
							<button onClick={() =>this.turnScannerOnOff(e)}>Turn Check In On/Off</button>
						)}
					</div>}


					<hr />

					</div>)}		)}

			</>
		)
}
}
export default withRouter(Profile)
