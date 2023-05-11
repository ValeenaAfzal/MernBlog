import axios from 'axios';
import { ServiceURL, API_Notification_messages } from '../Constants/config';
import { getAccessToken, getRefreshToken, setAccessToken, getType } from  '../Assets/constants'


//backend URL used while making express server
const URL = 'http://localhost:8080';

//using api interceptors
const createApis = axios.create(
    {
        baseURL: URL,
        //if api gets delayed or goto pending
        timeout: 10000,
        headers: {
            "content-type": "application/json"
        }
    }

)

createApis.interceptors.request.use( //take two call back fnction for suceess and fail 
    function(config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

createApis.interceptors.response.use(
    function (response) {
        //if you use loader - stop loader here
        return SendRespose(response);

    },
    function (error) {
        return Promise.reject(ProcessError(error));
    }

)

// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isFailure: true, status: string, msg: string, code: int }

const SendRespose = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code //status code 
        }
    }
}

// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isError: true, status: string, msg: string, code: int }
const ProcessError = (error) => {// process three types of error request,response or null
    if (error.response) {
        // Request made and server responded with a status code that falls out of the range of 2xx
        if (error.response?.status === 403) {
            // const { url, config } = error.response;
            // console.log(error);
            // try {
            //     let response = await API.getRefreshToken({ token: getRefreshToken() });
            //     if (response.isSuccess) {
            sessionStorage.clear();
            //         setAccessToken(response.data.accessToken);

            //         const requestData = error.toJSON();

            //         let response1 = await axios({
            //             method: requestData.config.method,
            //             url: requestData.config.baseURL + requestData.config.url,
            //             headers: { "content-type": "application/json", "authorization": getAccessToken() },
            //             params: requestData.config.params
            //         });
            //     }
            // } catch (error) {
            //     return Promise.reject(error)
            // }
        } else {
            console.log("ERROR IN RESPONSE: ", error.toJSON());
            return {
                isError: true,
                msg: API_Notification_messages.responseFailure,
                code: error.response.status
            }
        }
    } else if (error.request) {
        // The request was made but no response was received
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_Notification_messages.requestFailure,
            code: "" // empty beacuse backend received no request
        }
    } else {
        //some problem caused by front end
        // Something happened in setting up the request that triggered an Error
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_Notification_messages.networkError,
            code: ""
        }
    }
}

//to handle multiple requests loop thorugh config apis end points
const API = {};
for (const [key, value] of Object.entries(ServiceURL)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => // showUploadProgress - showDownloadProgress this is used to show laoder
    createApis({
            method: value.method, //value==object
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,//donot send body 
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}
export { API };
