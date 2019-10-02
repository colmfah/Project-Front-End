import React from "react";
import { Link } from "react-router-dom";
import cardDefault from "../images/card-default.jpg"
import '../Styles/Card.css'
import moment from "moment"

class Card extends React.Component {
  state = {};
  render() {
    return (
      <card>
        <div className="card-container">
          <div className="flipper">
            <div
              className="front"
              style={{
                background: `url(${cardDefault})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            >
              <div className="wrap">
                <h2>
                  <strong>{this.props.name}</strong>
                </h2>
                <small className="venue">
                  <i
                    className="fas fa-map-marker-alt"
                    style={{ color: "#EF5A00" }}
                  ></i>
                  {this.props.location}
                </small>
              </div>
            </div>
            <div className="back">
              {/* <div className="logo-wrapper">
                <i className="fas fa-ticket-alt" ></i>
              </div> */}
              <div className="head-wrap">
                <h1>{this.props.name}</h1>
              </div>
              <p>
                <i
                  className="fas fa-map-marker-alt"
                  style={{ color: "#EF5A00" }}
                ></i>{" "}
                {this.props.location}
              </p>
              <p>
                <i
                  className="fas fa-map-marker-alt"
                  style={{ color: "#EF5A00" }}
                ></i>{" "}
                {this.props.location}
              </p>
              <p>
                <i
                  className="far fa-calendar-check"
                  style={{ color: "#EF5A00" }}
                ></i>{" "}
                {moment(this.props.startDetails).format('D MMMM YYYY')}
              </p>
              <p>
                <i
                  className="fas fa-dollar-sign"
                  style={{ color: "#EF5A00" }}
                ></i>{" "}
                {this.props.price}
              </p>
              <p>
                <i className="fas fa-clock" style={{ color: "#EF5A00" }}></i>{" "}
                {moment(this.props.startDetails).format('HH:mm')}
              </p>
              <p>
                <small>adventures with prostitutes</small>
              </p>
              <Link to="#">
                <button type="button" className="card-button">
                  <strong>Go To Event</strong>
                </button>
              </Link>
            </div>
          </div>
        </div>{" "}
      </card>
    );
  }
}

export default Card;
