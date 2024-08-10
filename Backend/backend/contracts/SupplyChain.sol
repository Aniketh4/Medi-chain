// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

contract SupplyChain {
    address public owner;
    uint256 public workerCount;

    struct Product {
        string id;
        string name;
        string price;
        string description;
        string manufacturing;
        uint256 timestamp;
    }

    struct Status {
        string location;
        uint256 timestamp;
        uint256 totalQuantity;
        string from;
        string to;
        string vendor;
    }

    struct Worker {
        string name;
        uint256 id;
    }

    Product[] public products;
    Worker[] public workers;
    mapping(string => Status[]) public productStatus;

    event WorkerAdded(uint256 indexed id, string name);
    event ProductAdded(string id, string name);
    event StatusAdded(string productId, string location, uint256 timestamp, uint256 totalQuantity, string from, string to, string vendor);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addWorker(string memory _name) external onlyOwner {
        workers.push(Worker(_name, workerCount));
        emit WorkerAdded(workerCount, _name);
        workerCount++;
    }

    function addProduct(string memory _name, string memory _price, string memory _description, string memory _id, string memory _manufacturing) external onlyOwner {
        products.push(Product(_id, _name, _price, _description, _manufacturing, block.timestamp));
        emit ProductAdded(_id, _name);
    }

    function addStatus(string memory _location, string memory _id, uint256 _totalQuantity, string memory _from, string memory _to, string memory _vendor) external {
        productStatus[_id].push(Status(_location, block.timestamp, _totalQuantity, _from, _to, _vendor));
        emit StatusAdded(_id, _location, block.timestamp, _totalQuantity, _from, _to,_vendor);
    }

    function getWorkersList() external view returns (Worker[] memory) {
        return workers;
    }

    function getProductStatus(string memory _id) external view returns (Status[] memory) {
        return productStatus[_id];
    }

    function getProducts() external view returns (Product[] memory) {
        return products;
    }

    function checkAuthenticity(string memory _productId) public view returns (bool) {
        for (uint256 i = 0; i < products.length; i++) {
            if (keccak256(abi.encodePacked(products[i].id)) == keccak256(abi.encodePacked(_productId))) {
                return true;
            }
        }
        return false;
    }
}