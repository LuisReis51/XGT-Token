// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract XGToken is ERC20, ERC20Burnable, Ownable {
    uint256 public maxSupply = 80_000_000_000 * 10 ** decimals(); // 80 billion max supply
    uint256 public blockReward = 1000 * 10 ** decimals(); // 1000 tokens per block mined
    uint256 public lastMinedBlock;
    mapping(address => uint256) public lastMinedBlockByMiner;
    
    // Token distribution
    uint256 public constant INITIAL_LIQUIDITY = 4_000_000_000 * 10 ** 18;  // 5% for initial liquidity
    uint256 public constant TEAM_SUPPLY = 16_000_000_000 * 10 ** 18;       // 20% for team/development
    uint256 public constant RESERVE_SUPPLY = 20_000_000_000 * 10 ** 18;    // 25% for project reserve
    uint256 public constant MINABLE_SUPPLY = 40_000_000_000 * 10 ** 18;    // 50% for mining/community
    
    constructor() ERC20("XG Token", "XGT") Ownable(msg.sender) {
        // Initial distribution
        _mint(msg.sender, INITIAL_LIQUIDITY);  // Initial liquidity (very small amount for $100)
        _mint(msg.sender, TEAM_SUPPLY);        // Team allocation
        _mint(msg.sender, RESERVE_SUPPLY);     // Project reserve
        
        lastMinedBlock = block.number;
    }

    // Mine new tokens
    function mine() public {
        require(totalSupply() + blockReward <= maxSupply, "Would exceed max supply");
        require(block.number > lastMinedBlockByMiner[msg.sender], "Must wait for next block");
        require(block.number - lastMinedBlockByMiner[msg.sender] >= 5, "Must wait 5 blocks between mining");
        require(totalSupply() < INITIAL_LIQUIDITY + TEAM_SUPPLY + RESERVE_SUPPLY + MINABLE_SUPPLY, "Mining cap reached");
        
        lastMinedBlockByMiner[msg.sender] = block.number;
        lastMinedBlock = block.number;
        _mint(msg.sender, blockReward);
    }

    // Mint new tokens (only owner)
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= maxSupply, "Would exceed max supply");
        _mint(to, amount);
    }

    // Burn tokens from owner's wallet
    function burnFromOwner(uint256 amount) public onlyOwner {
        _burn(_msgSender(), amount);
    }

    // Allow owner to adjust block reward
    function setBlockReward(uint256 newReward) public onlyOwner {
        blockReward = newReward * 10 ** decimals();
    }

    // View current mining stats
    function getMiningStats(address miner) public view returns (
        uint256 nextMiningBlock,
        uint256 blocksToWait,
        uint256 currentReward,
        uint256 remainingMinable
    ) {
        uint256 nextBlock = lastMinedBlockByMiner[miner] + 5;
        uint256 toWait = nextBlock > block.number ? nextBlock - block.number : 0;
        uint256 remaining = MINABLE_SUPPLY - (totalSupply() - INITIAL_LIQUIDITY - TEAM_SUPPLY - RESERVE_SUPPLY);
        
        return (
            nextBlock,
            toWait,
            blockReward,
            remaining
        );
    }
}
