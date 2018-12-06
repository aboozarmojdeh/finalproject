import React from "react";
import "./SearchResults.css";
import { Col } from "react-grid-system";

const SearchResults = props =>
    <Col sm={4}>
      <div className="card-deck">
        <div className="card text-center">
          <div className="card-header" id="resultsHeader" />
          <div className="card-body" id="resultsDiv">
            {console.log("props is:", props)}

            {/* <p className="card-text">Full Name: {props.name}</p> */}
            <p className="card-text">Wall Name: {props.wallName.toUpperCase()}</p>
            <p className="card-text"> Gift Name: {props.item}</p>
            <p className="card-text"> Date Posted (YYYY-MM-DD):</p>
            <p className="card-text">{props.date}</p>
            <p className="card-text"> Distance:</p>
            <p className="card-text">{props.distanceM} m</p>
            <p className="card-text">{props.distanceKM} km</p>
            {/* <p className="card-text"> Email Address: {props.email}</p> */}
            {/* <p className="card-text"> City: {props.city.toUpperCase()}</p> */}
            {/* <p className="card-text"> Address: {props.address}</p> */}

            <button
              className="registerBtn "
              name={props.email}
              onClick={props.openModal}
            >
              Request
            </button>

            {/* <h4 className="invisible" id="toast">
              Your email is being sent.
            </h4> */}
          </div>
        </div>
      </div>
    </Col>

export default SearchResults;
