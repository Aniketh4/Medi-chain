import React, { useState , useEffect} from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/Supplychain.json";
import { id } from 'ethers/lib/utils';
import A from "../artifacts/contracts/SupplyChain.sol/address.json"
import { ethers } from 'ethers';


const UpdateStatusform = ({ onAdd }) => {

  const ContractAddress = A.addres //"0xFa56954976bA7d616945c09A7e360499e7038d98";//"0xFa56954976bA7d616945c09A7e360499e7038d98";

  async function requestAccount() {
      await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const [rfid, setRfid] = useState("Null");

  useEffect(() => {
    let intervalId;

    // Function to fetch RFID tag ID
    async function fetchRfid() {
      try {
        console.log("dsf")
        const response = await fetch('http://192.168.143.43');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.text();
        console.log(data,"rfidddd")
        setRfid(data);
      } catch (error) {
        console.error('There was a problem fetching RFID tag ID:', error);
      }
    }

    // Start fetching RFID every 5 seconds until RFID is not null
    if (rfid === "Null") {
      intervalId = setInterval(fetchRfid, 5000);
    }
    else {
      check(rfid);
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [rfid]);

  async function check(rfid) {
    if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(await signer.getAddress())

        const contract = new ethers.Contract(
            ContractAddress,
            SupplyChain,
            signer
        );

        let a = await contract.checkAuthenticity(rfid);
        if (!a) {
            // Send POST request with value "false" to http://192.168.23.43
            try {
              const response = await fetch('http://192.168.143.43', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded' // Change content type
                  },
                  body: 'led=false' // Send form-encoded data
              });
          
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log("POST request successful");
            } catch (error) {
                console.error('There was a problem sending POST request:', error);
            }
        }
    }
}

  const [product, setProduct] = useState({
    id: '',
    name: '',
    Vendor: '',
    To:'',
    From: '',
    Date: '',
    quantity:0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProduct({
      id: '',
      name: '',
      Vendor: '',
      To:'',
      From: '',
      Date: '',
      quantity:0,
    });
    await addProduct(rfid, product.name, product.Vendor, product.To , product.From, product.Date, product.quantity);
  };
  
  async function addProduct(id,name, Vendor, To, From,Date,quantity) {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(await signer.getAddress())
  
      const contract = new ethers.Contract(
        ContractAddress,
        SupplyChain,
        signer
      );
  
      // Assuming `addProduct` is a function in your smart contract
      try{
      await contract.addStatus(Vendor, id, quantity, From, To,Vendor);
      await setRfid("Null");
      }
      catch(error){
        alert("Only accounts with access can add Products");
      }

    }
  }
  

  return (
    <div class="landing-wrapper">
    <Container maxWidth="sm" style={{ marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Update Product Status
      </Typography>
      <form onSubmit={handleSubmit}>
      <TextField
          name="id"
          label="ID"
          value={rfid === "Null" ? '' : rfid}
          fullWidth
          margin="normal"
          InputProps={{ style: { backgroundColor: 'white' }, readOnly: true }}
        />
        <TextField
          name="name"
          label="Name"
          value={product.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{ style: { backgroundColor: 'white' } }}
        />
        <TextField
          name="Vendor"
          label="Vendor"
          value={product.Vendor}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{ style: { backgroundColor: 'white' } }}
        />
        <TextField
          name="To"
          label="To"
          value={product.To}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{ style: { backgroundColor: 'white' } }}
        />
        <TextField
          name="From"
          label="From"
          value={product.From}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{ style: { backgroundColor: 'white' } }}
        />
        <TextField
          name="Date"
          label="Date"
          type="date"
          value={product.Date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{ style: { backgroundColor: 'white' } }}
          InputLabelProps={{
            style: { backgroundColor: 'white' },
            shrink: true,
          }}
        />
        <TextField
          name="quantity"
          label="Quantity"
          type="number" // Specify 'number' type for integer input
          value={product.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{ style: { backgroundColor: 'white' } }}
          InputLabelProps={{
            style: { backgroundColor: 'white' },
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </form>
    </Container>
    </div>
  );
};

export default UpdateStatusform;
