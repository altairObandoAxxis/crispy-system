import { doCmd } from "../util/doCmd";
import { getUserInfo } from "../util/login";

export const GetContact = async ()=>{
    const { email } = await getUserInfo();
    const GetContacts = await doCmd({ cmd:'GetContacts', data:{ filter:`[user] LIKE '${ email }'` }});
    return GetContacts.outData[0];
}
export const AddOrUpdateContact = async()=>{

}