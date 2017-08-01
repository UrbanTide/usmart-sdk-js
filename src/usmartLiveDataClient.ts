
import interfaces = require("./interfaces");
import USMARTClient = require("./usmartClient");
import deferredTS = require("typescript-deferred");

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
    return debug ? "https://livedata.usmart.io" : "http://localhost:9005";
  }
}
