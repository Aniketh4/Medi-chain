import React, { useState, useEffect } from 'react';
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/Supplychain.json";
import { ethers } from "ethers";
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import SendIcon from '@mui/icons-material/Send';
import A from "../artifacts/contracts/SupplyChain.sol/address.json"

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import StatusModal from './StatusModal.js';

const DisplayStatus = () => {
    const ContractAddress = A.addres //"0xFa56954976bA7d616945c09A7e360499e7038d98";
    const [id, setId] = useState(1);
    const [data, setData] = useState();

    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }
    console.log(id);
    async function getStatus() {
        
        if (typeof window.ethereum !== "undefined") {
            requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log(await signer.getAddress())

            const contract = new ethers.Contract(
                ContractAddress,
                SupplyChain,
                provider
            );
            try {

                const Sdata = await contract.getProductStatus(id);
                
                console.log("data: ", Sdata);
                setData(Sdata);
                //console.log(contract);

            } catch (err) {
                console.log("Error: ", err);
            }
        }
    }

    function convertTimestamp(t) {
        var intTimestamp = parseInt(t, 16);
        // console.log(intTimestamp)
        var s = new Date(intTimestamp*1000);
        return String(s).substring(0, 24);
    }

    return (
        <center>
        <div style={{padding: "2.5%"}}>
            <div>
                {/* <TextField variant="outlined" id="outlined" label="Enter Product ID" onChange={(e) => setId(e.target.value)} />
                <Button variant="contained" endIcon={<SendIcon />} onClick={getStatus} >
                Send
                </Button> */}
                <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Enter Product ID"
                    onChange= {(e) => setId(e.target.value)}
                />
                <IconButton sx={{ p: '10px' }} aria-label="search" onClick={getStatus}>
                    <SearchIcon />
                </IconButton>
                </Paper>
            </div>
        </div>
        <div style={{color: "white"}}>
            {!data ? (
                <Box sx={{ color: 'grey.500' }}>
                    <CircularProgress color="inherit"/>
                </Box>
            ) : (
                <div>
                    <h1>Product Status</h1>

                <Timeline position="left">
                {data.map((row, iterator) => (
  <TimelineItem key={iterator}>
    <TimelineOppositeContent sx={{ py: '10px', px: 2 }}>
      {/* Convert Unix timestamp to Date object and extract hour and minute */}
      {new Date(row.timestamp * 1000).toLocaleDateString('en-GB')} <br></br>{new Date(row.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </TimelineOppositeContent>
    <TimelineSeparator>
      {/* You can keep StatusModal or remove it as needed */}
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent sx={{ py: '10px', px: 2 }}>
        <Typography variant='h6' component="span">
            Vendor Name: {row.vendor}<br></br>
        </Typography>
      <Typography variant="h6" component="span">
        From: {row.from} <br></br>
      </Typography>
      <Typography variant="h6" component="span">
        To: {row.to} <br></br>
      </Typography>
      <Typography variant='h6' component="span">
        Quantity: {row.totalQuantity.toString()}
        </Typography>
    </TimelineContent>
  </TimelineItem> 
))}
                </Timeline>
                </div>
            )}
        </div>
        </center>
    );
}

export default DisplayStatus;