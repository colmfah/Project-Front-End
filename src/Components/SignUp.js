import React from 'react'
import axios from 'axios'
import '../Styles/Form.css'
import {Link} from 'react-router-dom'
import Nav from './Nav'
import '../Styles/Form.css'
import backgroundDefault from "../images/background-default.jpg";

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
		axios.post(`${process.env.REACT_APP_API}/users`, this.state.user)
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
			<form onSubmit={this.signup}>

			<div className="content">
				<div className="group logo3">

				<i className="fas fa-ticket-alt logo group logo3 ticket-form"></i>

					<div className="form-info">

						{this.state.formFields.map((e,i) =>
								<div className="group" key={i}>
									<label>{e.label}</label>
									<input
										value={this.state.user[e.value]}
										required
										onChange={(event) => this.changeField(event, e.value)}
										type={e.type}/>
									</div>
							)
						}

						<button className="primary group logo3"><strong>Signup</strong></button>

					</div>
				<p className="footer" >
					Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
				</p>

				</div>
			</div>
			</form>
			</div>
			</div>
			<span>{this.state.errorMsg}</span>
			</>
		)
}
}





export default SignUp
