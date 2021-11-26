import React, { useState, useEffect } from 'react'
import axios from 'axios';


const getDisplayName = ({WrappedComponent}) => {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export const WithApiProgress = ( {WrappedComponent}, apiPath) => {

    // const [displayName, setDisplayName] = useState(`ApiProgress`);//${getDisplayName(WrappedComponent)}
    // const [pendingApiCall, setPendingApiCall] = useState(false);

    // useEffect(() => {
    //         const requestInterceptor = axios.interceptors.request.use((request) => {
    //             updateApiCallFor(request.url, true);
    //             return request;
    //         }); 
    
    //         const responseInterceptor = axios.interceptors.response.use((response) => {
    //             updateApiCallFor(response.config.url, false);
    //             return response;
    //         }, (error) => {
    //             updateApiCallFor(error.config.url, false);
    //             throw error;
    //         });

    //         return function cleanup () {
    //             axios.interceptors.request.eject(requestInterceptor);
    //             axios.interceptors.response.eject(responseInterceptor);
    //         }
    // }, []);

    // const updateApiCallFor = (url, inProgress) => {
    //     if (url === apiPath){
    //         setPendingApiCall(inProgress);
    //     }
    // };

    // return(
    //     <WrappedComponent pendingApiCall={pendingApiCall} />
    // );
}
