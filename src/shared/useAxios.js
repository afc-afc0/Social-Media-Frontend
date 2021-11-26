import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export const useAxios = (axiosParams) => {
    const [response, setResponse] = useState(undefined);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = async (params) => {
      try {
       const result = await axios.request(params);
       setResponse(result.data);
       } catch( errors ) {
         setErrors(errors);
       } finally {
         setLoading(false);
       }
    };

    useEffect(() => {
        console.log("using axios 2");
        fetchData(axiosParams);
    }, [] ); // execute once only

    return { response, errors, loading };
};

