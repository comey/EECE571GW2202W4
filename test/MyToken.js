const { expect , assert} = require("chai");
const BigNumber = require('big-number');

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MyToken");

    const hardhatToken = await Token.deploy("10000000000000000000000","18");

    const ownerBalance = await hardhatToken.balanceOf(owner.address);

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const owners = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MyToken");

    const hardhatToken = await Token.connect(owners[0]).deploy("10000000000000000000000","18");

    expect(await hardhatToken.totalSupply()).to.not.equal(await hardhatToken.balanceOf(owners[1].address));
  });

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const owners = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MyToken");

    const hardhatToken = await Token.connect(owners[0]).deploy("10000000000000000000000","18");

    const TokenSale = await ethers.getContractFactory("MyTokenSale");

    const hardhatTokenSale = await TokenSale.connect(owners[1]).deploy(hardhatToken.address,"1");

    await expect(hardhatToken.connect(owners[1]).transfer(hardhatTokenSale.address, await hardhatToken.totalSupply())).to.be.reverted;

  });

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const owners = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MyToken");

    const hardhatToken = await Token.connect(owners[0]).deploy("10000000000000000000000","18");

    const TokenSale = await ethers.getContractFactory("MyTokenSale");

    const hardhatTokenSale = await TokenSale.connect(owners[1]).deploy(hardhatToken.address,"1");

    await hardhatToken.connect(owners[0]).transfer(hardhatTokenSale.address, await hardhatToken.totalSupply());

    expect(await hardhatToken.totalSupply()).to.equal(await hardhatToken.balanceOf(hardhatTokenSale.address));
  });


  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const owners = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MyToken");

    const hardhatToken = await Token.connect(owners[0]).deploy("10000000000000000000000","18");

    const TokenSale = await ethers.getContractFactory("MyTokenSale");

    const hardhatTokenSale = await TokenSale.connect(owners[1]).deploy(hardhatToken.address,"1");

    await hardhatToken.connect(owners[0]).transfer(hardhatTokenSale.address, await hardhatToken.totalSupply());

    const beforePurchase = BigNumber(await owners[2].getBalance()+"");

    const estimatedGas = await hardhatTokenSale.connect(owners[2]).estimateGas.buyTokens("1000000000000000000", {value: "1000000000000000000"});

    const buyTokenTransactionReciept = await hardhatTokenSale.connect(owners[2]).buyTokens("1000000000000000000", {value: "1000000000000000000"});

    const afterPurchase = BigNumber(await owners[2].getBalance()+"");
    const string1 = beforePurchase.subtract(afterPurchase).subtract(BigNumber(await hardhatToken.balanceOf(owners[2].address)+""))+"";
    const string2 = BigNumber(buyTokenTransactionReciept.gasPrice+"").multiply(BigNumber(estimatedGas+""))+"";
    assert.equal(string1, string2);
  });


});
