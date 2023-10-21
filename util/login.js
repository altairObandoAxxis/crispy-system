import axios from 'axios';
import { saveValueFor, getValueFor } from './secure'
const MOBILE_TOKEN = 'mobileToken', USER_INFO = 'userInfo';


const defaultOptions = async () =>({
    method:'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + await getLoginToken(),
    },
})


export const newLogin = async ({ email, clave })=>{
    try {
        const response     = await axios.post(process.env.EXPO_PUBLIC_SIS11LOG, { email, clave }, (await defaultOptions()).headers)
        const { ok, msg, outData: { token }} = response.data;
        if(!ok) throw msg;
        await saveValueFor({ key: MOBILE_TOKEN, value: token });
        await saveValueFor({ key: USER_INFO, value: JSON.stringify(response.data.outData) });
        return { ok: true, token, userInfo: response.data.outData };
    } catch (error) {
        console.error(error);
        await saveValueFor({ key: MOBILE_TOKEN, value: '' });
        return { ok: false, token: '' }
    }
}

export const getLoginToken = async() => await getValueFor({ key: MOBILE_TOKEN, f: '' });
export const getUserInfo = async() => JSON.parse(await getValueFor({ key: USER_INFO, f: '{}' }));
export const logout = async()=> {
    await saveValueFor({ key: MOBILE_TOKEN, value: '' });
    await saveValueFor({ key: USER_INFO, value: '' });
}