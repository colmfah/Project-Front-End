import React from 'react'
import axios from 'axios'

class SignUp extends React.Component {

	state = {
		formFields: [
			{label:'Name', type:'text', value:'name'},
			{label:'Email', type:'email', value:'email'},
			{label:'Password', type:'password', value:'password'},
			{label:'Location', type:'text', value:'location'}
		],

		user: {
			name: '',
			email: '',
			password: '',
			location: ''
		},

		errorMsg: ''
	}

	changeField = (e, field) => {
		let user = this.state.user
		user[field] = e.target.value
		this.setState({user})
	}

	signup = (e) => {
		e.preventDefault()
		axios.post(`http://localhost:4000/users`, this.state.user)
		.then(res => {
			res.data === 'You already registered'  ? 	this.setState({errorMsg:'You already registered. Please Log In'}): localStorage.setItem('token', res.data)}

		)
		.catch(err => {
			console.log(err)
		})
		this.props.history.push({
			pathname: '/events'
		})
	}


	render() {

	  return (
			<>
			<form onSubmit={this.signup}>
				{this.state.formFields.map((e,i) =>
						<div key={i}>
							<label>{e.label}</label>
							<input
								value={this.state.user[e.value]}
								required
								onChange={(event) => this.changeField(event, e.value)}
								type={e.type}/>
						</div>
					)
				}
				<button>Signup</button>
			</form>
			<span>{this.state.errorMsg}</span>
			</>
		)
}
}

export default SignUp
