import React from "react";

class ProfileCard extends React.Component {
  render() {
    return (
      <div className="cardBack">
        <div className="head-wrap">
          <h1>Event Name</h1>
        </div>
        <p>
          <i className="fas fa-map-marker-alt" style={{ color: "#EF5A00" }}></i>{" "}
          Venue
        </p>
        <p>
          <i className="fas fa-map-marker-alt" style={{ color: "#EF5A00" }}></i>{" "}
          City
        </p>
        <p>
          <i className="far fa-calendar-check" style={{ color: "#EF5A00" }}></i>{" "}
          Date:
        </p>
        <p>
          <i className="fas fa-dollar-sign" style={{ color: "#EF5A00" }}></i>{" "}
          Price
        </p>
        <p>
          <i className="fas fa-clock" style={{ color: "#EF5A00" }}></i> Doors
        </p>
        <p>
          <small>Catagory</small>
        </p>
      </div>
    );
  }
}

export default ProfileCard;
