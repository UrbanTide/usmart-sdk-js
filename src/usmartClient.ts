
const Primus = require("primus");
import interfaces = require("./interfaces");
import Q = require("q");

export class USMARTClient {
  protected client: any;
  private authInfo: interfaces.IAuthInfo;
  private socket: any;
  private messageCount: number;
  private messagePromise: any;
  private messageUpdatePromise: any;

  constructor(serviceName: string, auth?: interfaces.IAuthInfo, debug = false) {
    this.messageCount   = 1;
    this.messagePromise = {};
    this.messageUpdatePromise = {};
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
      if ( !!data.status
        && !!data.status.reference
        && this.messageUpdatePromise.hasOwnProperty(data.status.reference) ) {
          this.messageUpdatePromise[data.status.reference].promise.notify(data.status);
          return;
      }

      if ( typeof data.messageCount !== "undefined" && this.messagePromise.hasOwnProperty(data.messageCount) ) {
        const listenToProgres = this.messagePromise[data.messageCount].listenToProgress;
        const isReferenceSet = !!this.messagePromise[data.messageCount].reference;

        if ( listenToProgres && !isReferenceSet ) {
          this.messagePromise[data.messageCount].reference = data.reference;
          this.messageUpdatePromise[data.reference] = this.messagePromise[data.messageCount];
        } else if ( !listenToProgres ) {
          this.messagePromise[data.messageCount].promise.resolve(data);
        }
      }
    });
  }

  protected actionWithParams(action: string, params: any, listenToProgress = false) {
    const currentMessageCount = this.messageCount++;
    const deferred = Q.defer();

    params.action = action;
    this.client.write({
      event: "action",
      params,
    });
    this.messagePromise[currentMessageCount] = {
      action,
      listenToProgress,
      promise: deferred,
    };

    return deferred.promise;
  }

  protected actionWithParamsAndListener(action: string, params: any) {
    return this.actionWithParams(
      action,
      params,
      true,
    );

  }

  protected getURL(serviceName: string, debug: boolean ) {
    return "not-set";
  }
}
