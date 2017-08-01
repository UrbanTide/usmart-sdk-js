
import interfaces = require("./interfaces");
import USMARTClient = require("./usmartClient");
import Q = require("q");

export class USMARTLiveDataClient extends USMARTClient.USMARTClient {

  constructor(auth?: interfaces.IAuthInfo, debug = false) {
    super("livedata", auth, debug);
  }

  public subscribe(dataset: string, organisation: string) {
    return this.actionWithParamsAndListener(
      "liveData:subscribe",
      {
        datasetGUID: dataset,
        organisationGUID: organisation,
      },
    );
  }

  protected getURL(serviceName: string, debug: boolean ) {
    return debug ? "http://localhost:9005" : "https://livedata.usmart.io";
  }
}
