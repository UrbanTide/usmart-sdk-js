import request = require("request");
import typescriptDeferred = require("typescript-deferred");

export interface IAuthInfo {
  keyId: string;
  keySecret: string;
}

export class USMART {
  private authInfo: IAuthInfo;

  constructor(auth?: IAuthInfo) {
    this.authInfo = auth;
  }

  public request(organisation: string, resource: string, revision?: string) {
    const url = this.buildURL(organisation, resource, revision);
    let headers;
    if ( this.authInfo ) {
      headers = {
        "api-key-id": this.authInfo.keyId,
        "api-key-secret": this.authInfo.keySecret,
      };
    }
    const deferred = typescriptDeferred.create();
    request.get({
        headers,
        url,
      },
      (error, response, body) => {
        if ( error ) {
          deferred.reject( body );
        } else {
          deferred.resolve(body);
        }
      },
    );
    return deferred.promise;
  }

  private buildURL(organisation: string, resource: string, revision: string) {
    return "https://api.usmart.io/org/" + organisation + "/" + resource + "/" +
      (revision ? revision + "/" : "latest/") + "urql?limit(1)";
  }

}
