import axios from "axios";


export const apiData = axios.create({
    baseURL: "https://take-home-test-api.nutech-integrasi.app"
})