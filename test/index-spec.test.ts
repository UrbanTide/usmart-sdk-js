
import index = require("../src/index");
import * as chai from "chai";

const expect = chai.expect;

describe("index", () => {
  it("should provide USMART", () => {
    expect(index.USMART).to.not.be.undefined;
  });
});
