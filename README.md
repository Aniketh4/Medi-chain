# Medi-chain
Medi-chain is a decentralized platform built on the Ethereum blockchain designed to track and manage medical supplies across the healthcare ecosystem. By leveraging smart contracts, Medi-chain ensures transparency, traceability, and security in the supply chain, preventing fraud and ensuring that medical supplies reach their intended destinations.

## FEATURES

- **Medicine Data Management:**
  - Admins can securely add medicine data to the blockchain, ensuring that all entries are immutable and traceable.
  
- **Restricted Access:**
  - Only the admin has the authority to view and manage the data on the blockchain, ensuring controlled access to sensitive information.

- **Step-by-Step Updates:**
  - Once the initial data is added, it can be updated incrementally, allowing for precise tracking of medical supplies throughout the supply chain.

## SETUP

**Prerequisites:**
- **Ganache**: For running a local Ethereum blockchain.
- **Truffle**: For compiling, deploying, and managing smart contracts.
- **Metamask**: For interacting with the Ethereum blockchain through your browser.

**Steps to Launch:**

1. **Start Ganache:**
   - Launch Ganache on your laptop to start a local Ethereum blockchain.

2. **Connect Metamask to Ganache:**
   - Open Metamask in your browser.
   - Connect it to the Ganache local blockchain network.

3. **Deploy the Smart Contract:**
   - Navigate to the `backend` folder in your project.
   - Using Truffle, deploy the smart contract to the Ganache local blockchain network by running:
     ```bash
     truffle migrate --reset
     ```
   - After deployment, copy the contract address.

4. **Update Contract Address in Client:**
   - Navigate to `client/src/contracts/`.
   - Open `address.json` and paste the copied contract address.

5. **Launch the Client:**
   - In the `client` folder, run the following command to start the React application:
     ```bash
     npm run
     ```
   - This will launch the client on the default React local address, typically `http://localhost:3000`.

6. **Access the Platform:**
   - Open your browser and go to `http://localhost:3000`.
   - Use the website to interact with the Medi-chain platform.
