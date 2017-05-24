import request = require("request");
import typescriptDeferred = require("typescript-deferred");

export interface IAuthInfo {
  keyId: string;
  keySecret: string;
}

export interface IQueryEqualPair {
  key: string;
  value: string;
}

export interface IQueryObject {
  limit?: number;
  offset?: number;
  equals?: IQueryEqualPair[];
}

export class USMART {
  private authInfo: IAuthInfo;

  constructor(auth?: IAuthInfo) {
    this.authInfo = auth;
  }

  public request(organisation: string, resource: string, revision?: string, query?: IQueryObject) {
    let url = this.buildURL(organisation, resource, revision);
    const queryString = this.buildQuery(query);
    url += "?" + queryString;

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
          deferred.resolve( body );
        }
      },
    );
    return deferred.promise;
  }

  private buildEqualQueries( equals: IQueryEqualPair[] ) {
    const queries: string[] = [];
    equals.forEach((equalQuery) => {
      queries.push(
        "" + equalQuery.key + "=" + equalQuery.value,
      );
    });
    return queries;
  }

  private buildQuery( query?: IQueryObject ) {
    const limit = query && query.limit ? query.limit : 10;
    const offset = query && query.offset ? query.offset : 0;

    let queries = [];
    queries.push("limit(" + limit + "," + offset + ")");
    if ( query && query.equals ) {
      queries = queries.concat(this.buildEqualQueries(query.equals));
    }
    return queries.join("&");
  }

  private buildURL(organisation: string, resource: string, revision: string) {
    return "https://api.usmart.io/org/" + organisation + "/" + resource + "/" +
      (revision ? revision + "/" : "latest/") + "urql";
  }

}
