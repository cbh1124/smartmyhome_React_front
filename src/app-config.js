let backendHost;

const hostname = window && window.location && window.location.hostname;

if(hostname === "localhost"){
    backendHost ="http://localhost:8095";
}else{
    backendHost="http://172.30.1.46:8095";
}

export const API_BASE_URL = `${backendHost}`;
