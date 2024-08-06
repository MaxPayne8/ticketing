import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      console.log("response__", response);

      if (response.status === 201 || response.status === 200) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      console.log(err);

      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(
          <div className="text-red-500 font-semibold">
            <h4>Ooops....</h4>
            <ul className="my-0">
              {err.response.data.errors.map((error) => (
                <li key={error.message}>{error.message}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        setErrors(
          <div className="text-red-500 font-semibold">
            <h4>Ooops....</h4>
            <p>Something went wrong. Please try again later.</p>
          </div>
        );
      }
    }
  };

  return { doRequest, errors };
};

export default useRequest;
