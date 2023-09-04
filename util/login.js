import { saveValueFor, getValueFor } from './secure'
const MOBILE_TOKEN = 'mobileToken', USER_INFO = 'userInfo';
const defaultOptions = {
    method:'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body:''
}


export const newLogin = async ({ email, clave })=>{
    try {
        defaultOptions.body= JSON.stringify({email, clave });
        const response = await fetch(process.env.EXPO_PUBLIC_SIS11LOG, defaultOptions );        
        const responseJSON = await response.json();
        const { ok, msg, outData: { token }} = responseJSON;
        console.log(responseJSON.outData);
        if(!ok) throw msg;
        await saveValueFor({ key: MOBILE_TOKEN, value: token });
        await saveValueFor({ key: USER_INFO, value: responseJSON.outData });
        return { ok: true, token };        
    } catch (error) {
        await saveValueFor({ key: MOBILE_TOKEN, value: '' });
        return { ok: false, token: '' }
    }
}

export const getLoginToken = async() => await getValueFor({ key: MOBILE_TOKEN, f: '' });
export const getUserInfo = async() => await getValueFor({ key: USER_INFO, f: {} });
export const logout = async()=> await saveValueFor({ key: MOBILE_TOKEN, value: '' });