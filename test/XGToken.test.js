const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("XGToken", function () {
  let XGToken;
  let token;
  let owner;
  let addr1;
  let addr2;
  const initialSupply = ethers.parseEther("100000"); // 100,000 tokens
  const maxSupply = ethers.parseEther("1000000"); // 1 million tokens

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    XGToken = await ethers.getContractFactory("XGToken");
    token = await XGToken.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });

    it("Should assign the initial supply to the owner", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(initialSupply);
    });

    it("Should set the max supply correctly", async function () {
      expect(await token.maxSupply()).to.equal(maxSupply);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseEther("50");
      // Transfer 50 tokens from owner to addr1
      await token.transfer(addr1.address, transferAmount);
      expect(await token.balanceOf(addr1.address)).to.equal(transferAmount);

      // Transfer 50 tokens from addr1 to addr2
      await token.connect(addr1).transfer(addr2.address, transferAmount);
      expect(await token.balanceOf(addr2.address)).to.equal(transferAmount);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await token.balanceOf(owner.address);
      const transferAmount = ethers.parseEther("1");
      await expect(
        token.connect(addr1).transfer(owner.address, transferAmount)
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
      expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint tokens", async function () {
      const mintAmount = ethers.parseEther("500");
      await token.mint(addr1.address, mintAmount);
      expect(await token.balanceOf(addr1.address)).to.equal(mintAmount);
    });

    it("Should fail if non-owner tries to mint", async function () {
      const mintAmount = ethers.parseEther("500");
      await expect(
        token.connect(addr1).mint(addr2.address, mintAmount)
      ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    });

    it("Should respect max supply", async function () {
      const currentSupply = await token.totalSupply();
      const maxSupply = await token.maxSupply();
      const mintAmount = maxSupply - currentSupply + 1n;
      await expect(
        token.mint(owner.address, mintAmount)
      ).to.be.revertedWith("Would exceed max supply");
    });
  });

  describe("Burning", function () {
    it("Should allow owner to burn their tokens", async function () {
      const burnAmount = ethers.parseEther("100");
      const initialBalance = await token.balanceOf(owner.address);
      await token.burnFromOwner(burnAmount);
      expect(await token.balanceOf(owner.address)).to.equal(initialBalance - burnAmount);
    });

    it("Should fail if non-owner tries to burn tokens", async function () {
      const burnAmount = ethers.parseEther("100");
      await expect(
        token.connect(addr1).burnFromOwner(burnAmount)
      ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    });
  });
});
