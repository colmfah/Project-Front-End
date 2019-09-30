import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import moment from "moment"

class Events extends React.Component {

	state = {
		events: [],
		currency: {
			'USD': '$',
			'EUR': '€',
			'NZD': '$'
		}
	}


componentDidMount(){
		axios.get(`http://localhost:4000/events`)
		.then(res => {
			this.setState({
				events: res.data
			})
		})
		.catch(err => {})
}

	render() {



	  return (
			<>
			{this.state.events.map(	(e,i) => {
				return(

				<div key={i}>
				<Link to={`/events/${e._id}`}>
				 <div>{e.title} </div>
				 <div>{e.description} </div>
				 <div>{e.location} </div>
				 <div>Starts: {moment(e.startDetails).format('D MMMM YYYY HH:mm')} </div>
				 <div>Ends: {moment(e.endDetails).format('D MMMM YYYY HH:mm')} </div>
				 <div>{this.state.currency[e.currency]}{e.price} {e.currency}  </div>
				 <div>Organiser: {e.organiser.name}</div>
				 <hr />
				 </Link>
				</div>

				)
			}		)
		}

			</>
		)
}
}

export default Events
