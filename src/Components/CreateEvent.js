import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import moment from "moment"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

class CreateEvent extends React.Component {

	state = {
		formFields: [
			{label:'Title', type:'text', value:'title'},
			{label:'Location', type:'text', value:'location'},
			{label:'Number of Tickets', type:'number', value:'ticketNo'},
			{label:'Description', type:'text', value:'description'},
			{label:'Price', type:'number', value:'price'}
		],

		userEvent: {},
		errorMsg: ''

	}


	componentDidMount(){
	let token = localStorage.getItem('token')
	let objectToSend = {
		token: token
	}
	axios.post(`http://localhost:4000/auth`, objectToSend)
	.then( res => {
		let userEvent = {
			title: '',
			location: '',
			ticketNo: '',
			price: '',
			description: '',
			startDetails: '',
			endDetails:'',
			organiser: res.data._id,
			currency: 'EUR'
		}
		this.setState({
			userEvent: userEvent
		})
	}
)
}


	changeField = (e, field) => {
		let userEvent = this.state.userEvent

		if(field === 'startDetails' || field === 'endDetails'){

				if(field === 'startDetails' && moment().isAfter(e)){
					this.setState({
						errorMsg: 'Start date & time must be in the future'
					})
				}

				else if(field === 'endDetails' && moment(e).isBefore(this.state.startDetails)){
					this.setState({
						errorMsg: 'Event must end after it starts!'
					})
				}

				else{
					userEvent[field] = e
					this.setState({
						errorMsg: ''
					})
				}

		}

		else{
		userEvent[field] = e.target.value
		}
		this.setState({userEvent})
	}


	createEvent = (e) => {
		e.preventDefault()
		axios.post(`http://localhost:4000/events`, this.state.userEvent)
		.then(res => {console.log(res)
		})
		.catch(err => {
			console.log(err)
		})
	}

	logout = () => {
		localStorage.removeItem('token')
		{this.props.history.push({
			pathname: '/events'
		})}
	}


	render() {

	  return (
			<>
			<form onSubmit={this.createEvent}>
				{this.state.formFields.map((e,i) =>
						<div key={i}>
							<label>{e.label}</label>
							<input
								value={this.state.userEvent[e.value]}
								required
								onChange={(event) => this.changeField(event, e.value)}
								type={e.type}
								
								/>
						</div>
					)
				}
				<select required value={this.state.userEvent.currency} onChange={(event) => this.changeField(event, 'currency')}>
					<option value="EUR">EUR</option>
					<option value="USD">USD</option>
					<option value="NZD">NZD</option>
				</select>

				<div required>
					Date & Time Event Starts: <DatePicker
						timeIntervals={15}
					  selected={this.state.userEvent.startDetails}
					  onChange={(event) => this.changeField(event, 'startDetails')}
					  showTimeSelect
					  dateFormat="Pp"
						required
					/>
				</div>


				<div>
					Date & Time Event Ends: <DatePicker
						timeIntervals={15}
						selected={this.state.userEvent.endDetails}
						onChange={(event) => this.changeField(event, 'endDetails')}
						showTimeSelect
						dateFormat="Pp"
						required
					/>
				</div>


				<button>Create Event</button>
			</form>
			<div>{this.state.errorMsg}</div>
			<button onClick={this.logout}>Log Out</button>
			</>
		)
}
}

export default withRouter(CreateEvent)
