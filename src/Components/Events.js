import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import moment from "moment"
import Nav from './Nav'
import Card from './Card'
import '../Styles/Events.css'
import backgroundEvents from "../images/events-background.jpg"


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
		axios.get(`${process.env.REACT_APP_API}/events`)
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
				<Nav />
				{/*<div
					id='background image'
					className="backgroundEvents"
					style={{
						backgroundColor: "blue"
					}}
				>
				THIS DIV IS GONE. BACKGROUND IMAGE SET IN CARD GRID CLASS
				*/}


			<div
			className="cardGrid"
			>


			{this.state.events.map(	(e,i) => {
				return(


				<Link to={`/events/${e._id}`}>
					<Card
						name={e.title}
						location={e.location}
						startDetails={e.startDetails}
						price={e.price}
						image={e.imageURL}
						/>
					</Link>

					)
				}		)
			}
			</div>




			</>
		)
}
}

{/*<div key={i}>
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
</div>*/}

export default Events
