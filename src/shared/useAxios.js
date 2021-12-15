import { useState } from 'react';
import axios from 'axios';

export const useAxios = (axiosParams) => {
    const [response, setResponse] = useState(undefined);
    const [apiError, setApiErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async (params) => {
      console.log("Using axios");
      try {
        setLoading(true);
        const result = await axios.request(params);
        setResponse(result.data);
      } catch( apiError ) {
        setApiErrors(apiError.response.data);
      } finally {
        setLoading(false);
      }
    };

    const apiRequestCallback = ( (event) => {
      event.preventDefault();
      if (loading === false){
        fetchData(axiosParams);
      }
    })

    return { response, apiError, loading, apiRequestCallback };
};

