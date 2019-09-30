import React from 'react'
import axios from 'axios'

class LogIn extends React.Component {

	state = {
		formFields: [
			{label:'Email', type:'email', value:'email'},
			{label:'Password', type:'password', value:'password'}
		],

		user: {
			email: '',
			password: ''
		},

		errorMsg: ''
	}


	changeField = (e, field) => {
		let user = this.state.user
		user[field] = e.target.value
		this.setState({user})
	}


	login = (e) => {
		e.preventDefault()
			axios.post(`http://localhost:4000/login`, this.state.user)
			.then(
				res => {
					let token = res.data.token
					if (token) {
						localStorage.setItem('token', token)
						this.setState({errorMsg:'Logged In'})
						this.props.history.push({
							pathname: '/events'
						})
					}

				else if(res.data === 'Wrong Password'){
					this.setState({errorMsg:'Wrong user name or password'})
				}
				else if (res.data === 'You need to register'){
					this.setState({errorMsg:'Email address not found. Please Register'})
				}
			}
			)
			.catch(err => {
				console.log(err)
			})
		}


	render() {

	  return (
			<>
			<form onSubmit={this.login}>
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
				<button>Log In</button>
			</form>
			<span>{this.state.errorMsg}</span>
			</>
		)
}
}

export default LogIn
