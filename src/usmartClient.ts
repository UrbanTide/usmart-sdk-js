
const Primus = require("Primus");
import interfaces = require("./interfaces");
import deferredTS = require("typescript-deferred");

export class USMARTClient {
  protected client: any;
  private authInfo: interfaces.IAuthInfo;
  private socket: any;
  private messageCount: number;
  private messagePromise: any;

  constructor(serviceName: string, auth?: interfaces.IAuthInfo, debug = false) {
    this.messageCount   = 0;
    this.messagePromise = {};
    this.authInfo       = auth;
    this.socket         = Primus.createSocket({
      transformer: "engine.io",
    });
    this.client = new this.socket(
      this.getURL(serviceName, debug), {
        transport: {
          extraHeaders: {
            "api-key-id": auth.keyId,
            "api-key-secret": auth.keySecret,
          },
        },
    });

    this.client.on("data", (data: any) => {
      console.log(data);
      if ( typeof data.messageCount !== "undefined" && this.messagePromise.hasOwnProperty(data.messageCount) ) {
        this.messagePromise[data.messageCount].promise.resolve(data);
      }
    });
  }

  protected actionWithParams(action: string, params: any, listenToProgress = false) {
    const currentMessageCount = this.messageCount++;
    const deferred = deferredTS.create();

    params.action = action;
    this.client.write({
      event: "action",
      params,
    });
    this.messagePromise[currentMessageCount] = {
      action,
      listenToProgress,
      promise: deferred,
    }

    return deferred.promise;
  }

  protected actionWithParamsAndListener(action: string, params: any) {
    return this.actionWithParams(
      action,
      params,
      true
    );

  }

  protected getURL(serviceName: string, debug: boolean ) {
    return "not-set";
  }
}
