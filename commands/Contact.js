import { doCmd } from "../util/doCmd";
import { getUserInfo } from "../util/login";

export const GetContact = async ()=>{
    const { email } = await getUserInfo();
    const GetContacts = await doCmd({ cmd:'GetContacts', data:{ filter:`[user] LIKE '${ email }'` }});
    return GetContacts.outData.pop();
}

export const SetContact = async( userEmail, contactId ) =>{
    // Check if contact has no other assigned user
    const hasUserResponse = await doCmd({cmd:'LoadEntity', data:{ entity:'Contact',filter:`id=${ contactId }`, fields:'id, [user] currentUser' }});
    // Validate contact exists
    if(typeof hasUserResponse.outData == 'undefined' || hasUserResponse.outData == null)
        throw `Contact with ID ${ contactId } does not exist in the system`;

    const { outData:{ id, currentUser }} = hasUserResponse;
    console.log(currentUser)
    if(currentUser != null)
        throw `Contact with ID ${ id } currently has the user ${ currentUser }`;

    // Update Contact
    await doCmd({ cmd:'SetField', data:{ entity:'Contact', entityId: contactId, fieldValue:`[user] = '${ userEmail }'`}});
    // Store new contact.
    return await GetContact();
}
export const AddOrUpdateContact = async()=>{

}