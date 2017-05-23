
import { USMART } from "../src/usmart";
import * as chai from "chai";

const expect = chai.expect;

describe("usmart", () => {
  it("should request sample data", (done) => {
    const usmart = new USMART();

    var organisation 	= '28ccd497-7cad-4470-bd17-721d5cbbd6ef';
    var resource 		= 'cd580a25-9918-4bba-a699-fa640a0cc44a';

    var expectedResult = '[\n{"TYPEOFTREE":"ParkTree","SPECIESTYPE":"Maple","SPECIES":"Acer pseudoplatanus","AGE":"Young","DESCRIPTION":"Juvenile/Young","TREESURROUND":"Bare Ground","VIGOUR":"Normal","CONDITION":"Fair","DIAMETERinCENTIMETRES":20,"SPREADRADIUSinMETRES":4,"TREELOCATIONX":330957.9,"TREELOCATIONY":371205.66,"LONGITUDE":-5.975813,"LATITUDE":54.572169,"TREETAG":"414","TREEHEIGHTinMETRES":8,"usmart_id":"AVvm5Awld_J1iIwX7HJx"}\n]\n';

    usmart.request(
      organisation,
      resource
    ).then((body) => {
      try {
        expect(body).to.equal(expectedResult);
        done();
      } catch(e){
        done(e);
      }
    });
  });
});
