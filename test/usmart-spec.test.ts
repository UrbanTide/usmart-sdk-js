
import { USMART } from "../src/usmart";
import * as chai from "chai";

const expect = chai.expect;

describe("usmart", () => {

  var usmartIdOfFirstElement = 'AVvm5Awld_J1iIwX7HJx';

  it("should request sample data", (done) => {
    const usmart = new USMART();

    var organisation   = '28ccd497-7cad-4470-bd17-721d5cbbd6ef';
    var resource     = 'cd580a25-9918-4bba-a699-fa640a0cc44a';

    var defaultLimit = 10;

    usmart.request(
      organisation,
      resource
    ).then((body :string) => {
      const result = JSON.parse(body);
      try {
        expect(result.length).to.equal(defaultLimit);
        expect(result[0].usmart_id).to.equal(usmartIdOfFirstElement);
        done();
      } catch(e){
        done(e);
      }
    });
  });

  it("should request sample data with limit adjusted", (done) => {
    const usmart = new USMART();

    var organisation   = '28ccd497-7cad-4470-bd17-721d5cbbd6ef';
    var resource     = 'cd580a25-9918-4bba-a699-fa640a0cc44a';

    var expectedLimit = 1;

    usmart.request(
      organisation,
      resource,
      "latest",
      {
        limit: expectedLimit
      }
    ).then((body :string) => {
      const result = JSON.parse(body);
      try {
        expect(result.length).to.equal(expectedLimit);
        expect(result[0].usmart_id).to.equal(usmartIdOfFirstElement);
        done();
      } catch(e){
        done(e);
      }
    });
  });

  it("should request sample data with limit and offset adjusted", (done) => {
    const usmart = new USMART();

    var organisation   = '28ccd497-7cad-4470-bd17-721d5cbbd6ef';
    var resource     = 'cd580a25-9918-4bba-a699-fa640a0cc44a';

    var expectedLimit = 2;
    var expectedOffset = 1;
    var secondItemUsmartId = "AVvm5Awld_J1iIwX7HJ0";

    usmart.request(
      organisation,
      resource,
      "latest",
      {
        limit: expectedLimit,
        offset: expectedOffset
      }
    ).then((body :string) => {
      const result = JSON.parse(body);
      try {
        expect(result.length).to.equal(expectedLimit);
        expect(result[0].usmart_id).to.equal(secondItemUsmartId);
        done();
      } catch(e){
        done(e);
      }
    });
  });

  it("should get sample data with equal query", (done) => {
    const usmart = new USMART();

    var organisation   = '28ccd497-7cad-4470-bd17-721d5cbbd6ef';
    var resource     = 'cd580a25-9918-4bba-a699-fa640a0cc44a';

    var treetag702usmartId = "AVvm5Ea2d_J1iIwX7Maa";

    usmart.request(
      organisation,
      resource,
      "latest",
      {
        equals: [{
          key: "TREELOCATIONX",
          value: "333285.78"
        }],
      }
    ).then((body :string) => {
      const result = JSON.parse(body);
      try {
        expect(result.length).to.equal(1);
        expect(result[0].usmart_id).to.equal(treetag702usmartId);
        done();
      } catch(e){
        done(e);
      }
    });
  });
});
