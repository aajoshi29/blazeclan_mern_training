import q from "q";
import http from "http";

class DataAccess {
  getData(options) {
    let defer = q.defer();
    let result;
    let responseData;
    if (!options) {
      defer.reject("Server Configuration is missing");
    } else {
      result = http.request(options, (res) => {
        res.on("data", (d) => {
          responseData = d;
        });
        res.on("end", () => {
          try {
            defer.resolve(responseData);
          } catch (ex) {
            defer.reject(`Some Error Occurred ${ex}`);
          }
        });
      });
    }
    result.end();
    return defer.promise;
  }
}

export default DataAccess;
