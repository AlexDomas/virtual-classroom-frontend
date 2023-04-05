import axios from "axios";

const BASE_URL = "http://localhost:8080/api/"

export const WS_CROSS_ORIGIN = 'http://localhost:8080/ws';

export default axios.create({
    baseURL: BASE_URL
})