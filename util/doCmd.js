import axios from "axios";
import { getLoginToken } from "./login"

export const doCmd = async ({ cmd, data }) =>{
    const token = await getLoginToken();
    try {
        const response = await axios.post(process.env.EXPO_PUBLIC_SIS11API, { cmd, data }, { headers: { 'Authorization': `Bearer ${ token }` }});
        return response.data;
    } catch (error) {
        return { cmd, outData: error.response.data }
    }
}