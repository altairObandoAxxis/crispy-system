import { doCmd } from "../util/doCmd";
import { getUserInfo } from "../util/login";

export const GetContact = async (userEmail)=>{
    const { email } = await getUserInfo();
    const GetContacts = await doCmd({ cmd:'GetContacts', data:{ filter:`[user] LIKE '${ userEmail || email }'` }});
    const length = GetContacts.outData.length;
    if(length>=0)
        return GetContacts.outData[length -1 ];
    return null;
}

export const SetContact = async( userEmail, contactId ) =>{
    // Check if contact has no other assigned user
    const hasUserResponse = await doCmd({cmd:'LoadEntity', data:{ entity:'Contact',filter:`id=${ contactId }`, fields:'id, [user] currentUser' }});
    // Validate contact exists
    if(typeof hasUserResponse.outData == 'undefined' || hasUserResponse.outData == null)
    throw `Contact with ID ${ contactId } does not exist in the system`;

    const { outData:{ id, currentUser }} = hasUserResponse;
    if(currentUser == userEmail){
        console.log('Same contact');
        return await GetContact(userEmail);
    }
    if(currentUser != null)
        throw `Contact with ID ${ id } currently has the user ${ currentUser }`;
    // Remove from another contact
    await doCmd({cmd:'DoQuery',data:{ sql:`UPDATE Contact SET [user]=NULL WHERE [user] LIKE '${ userEmail }'`}});
    // Update Contact
    await doCmd({ cmd:'SetField', data:{ entity:'Contact', entityId: contactId, fieldValue:`[user] = '${ userEmail }'`}});
    // Store new contact.
    const contact  =  await GetContact();
    return contact;
}
export const AddOrUpdateContact = async()=>{

}