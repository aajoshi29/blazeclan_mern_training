import { useState, useEffect } from "react";

const useRemoteOperation = (url, type, data, options) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (type === "GET") {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setResponse(data));
    }
  }, [url]);

  return [response];
};

export default useRemoteOperation;
