import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxios = (axiosParams) => {
    const [response, setResponse] = useState(undefined);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = async (params) => {
      try {
        console.log(params);
        const result = await axios.request(params);
        setResponse(result.data);
      } catch( errors ) {
        console.log(errors);
        setErrors(errors);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchData(axiosParams);
        // const requestInterceptor = axios.interceptors.request.use(interceptors.request, interceptors.error);
        // // add response interceptors
        // const responseInterceptor = axios.interceptors.response.use(interceptors.response, interceptors.error);

        // return () => {
        //   // remove all intercepts when done
        //   axios.interceptors.request.eject(requestInterceptor);
        //   axios.interceptors.response.eject(responseInterceptor);
        // };
    },[]); // execute once only

    return { response, errors, loading };
};

