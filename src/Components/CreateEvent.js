import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import moment from "moment"
import DatePicker from "react-datepicker"
import Nav from './Nav'
import "react-datepicker/dist/react-datepicker.css"
import backgroundDefault from "../images/background-default.jpg"
import '../Styles/Form.css'


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
		this.props.history.push({
			pathname: '/events'
		})
	}


	render() {

	  return (
			<>
			<div
				className="b-ground"
				style={{
					backgroundImage: `url(${backgroundDefault})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					width: "100%",
					height: "100%"
				}}
			>
				<div
					className="page-grid"
					style={{
						display: "grid",
						gridTemplateColumns: "1fr auto 1fr "
					}}
				>
				<Nav />


			<form onSubmit={this.createEvent}>

			<div className="content">
				<div className="group logo3">

				<i className="fas fa-ticket-alt logo group logo3 ticket-form"></i>

					<div className="form-info">

				{this.state.formFields.map((e,i) =>
						<div className="group" key={i}>

							<input
								value={this.state.userEvent[e.value]}
								required
								onChange={(event) => this.changeField(event, e.value)}
								type={e.type}
								placeholder={e.label}

								/>
						</div>
					)
				}
				<select className="group" required style={{textAlign: "left"}} value={this.state.userEvent.currency} onChange={(event) => this.changeField(event, 'currency')}>
					<option value="EUR">EUR</option>
					<option value="USD">USD</option>
					<option value="NZD">NZD</option>
				</select>

				<div required className="group">
					Date & Time Event Starts: <DatePicker
						timeIntervals={15}
					  selected={this.state.userEvent.startDetails}
					  onChange={(event) => this.changeField(event, 'startDetails')}
					  showTimeSelect
					  dateFormat="Pp"
						required
					/>
				</div>


				<div className="group">
					Date & Time Event Ends: <DatePicker
						timeIntervals={15}
						selected={this.state.userEvent.endDetails}
						onChange={(event) => this.changeField(event, 'endDetails')}
						showTimeSelect
						dateFormat="Pp"
						required
					/>
				</div>

				<div>{this.state.errorMsg}</div>
				<button className="primary group logo3"><strong>Create</strong></button>

			</div>

		</div>
	</div>
			</form>
			</div>
			</div>

			</>
		)
}
}

export default withRouter(CreateEvent)
