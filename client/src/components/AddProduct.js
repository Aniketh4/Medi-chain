import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/Supplychain.json";
import A from "../artifacts/contracts/SupplyChain.sol/address.json"
import { id } from 'ethers/lib/utils';
import { ethers } from 'ethers';


const AddProductForm = ({ onAdd }) => {
  const ContractAddress = A.addres //"0xFa56954976bA7d616945c09A7e360499e7038d98";

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
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [rfid]);

  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    manufacturingDate: '',
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
      price: '',
      description: '',
      manufacturingDate: '',
    });
    await addProduct(product.name, product.price, product.description, product.manufacturingDate, rfid);
  };
  
  async function addProduct(name, price, description, manufacturingDate, id) {
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
      await contract.addProduct(name, price, description, manufacturingDate, id);
      await setRfid("Null");
      }
      catch(error){
        alert("Only accounts with access can add Products");
      }
      setRfid("Null"); 
    }
  }
  

  return (
    <div class="landing-wrapper">
    <Container maxWidth="sm" style={{ marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Add Product
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
          name="price"
          label="Price"
          value={product.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{ style: { backgroundColor: 'white' } }}
        />
        <TextField
          name="description"
          label="Description"
          value={product.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{ style: { backgroundColor: 'white' } }}
        />
        <TextField
          name="manufacturingDate"
          label="Manufacturing Date"
          type="date"
          value={product.manufacturingDate}
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

export default AddProductForm;
