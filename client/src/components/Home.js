import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  return (
    <div class="landing-wrapper">
    <div id="heading">MediChain: IOT based Medicine Supply Chain using Blockchain</div>
      <h3>This app is for simulation of Pharmaceutical Supply Chain.</h3>
      <h3> WORKING</h3>
      <div
        style={{
          width: "50%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ marginTop: "2%" }}>
          <li>
            Get data from RFID and pass it
            through NODE-MCU
          </li>
          <li style={{ marginTop: "2%" }}>
            Then we pass that data as parameter in API that calls smart
            contract using web3.js and send data to ethereum blockchain
          </li>
          <li style={{ marginTop: "2%" }}>
            Now users can see their data in real time using this frontend app
            like, Product info like id, worker id ,Location ,Delivery status, etc
          </li>
        </ul>
      </div>
      <p>Please Connect to Ganache blockchain Network</p>
    </div>
  );
};

export default Home;
