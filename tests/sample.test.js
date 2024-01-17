const chai = require("chai");
const app = require("../src/utilities/sample2");

describe("Check Utility test suit", async function () {
  before(() => console.log("Check Utility test Initiated"));

  it("TestCase 1", async function () {
    const response = await app.getName();
    chai.expect(response).eq('John Doe');
  });

  after(function () {
    console.log("Check Utility test Done");
  });
});
