import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Button, Dialog, Input, LinearProgress, Text } from '@rneui/themed'
import { logout } from '../../util/login'
import { UserContext } from '../../util/UserContext'
import { SetContact } from '../../commands/Contact'


const styles = {
    container: { justifyContent: 'center', alignItems: 'center', flexDirection:'column', height:'100%', gap: 25 },
    title: { display:'flex', flexDirection:'row', alignItems:'center' }
}

export const NoContact = ({ navigation }) => {
    const [ visible, setVisible ] = useState(false);
    const [ contactId, setContactId ] = useState();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] =useState(null);

    const contactRef = useRef(null);
    const { state:{ ShowLogin, user: { esAdmin, email } }, setData: setUserData } = React.useContext(UserContext);
    const closeSession = ()=>{
        logout();
        ShowLogin();
    }
    const GoToHome =()=>{
       if(!navigation)
        return;
       navigation.navigate('Home');
    }
    const onChangeContactPress = async ()=>{
        setError(null);
        setLoading(true);
        try {
            if(!contactId){
                contactRef.current.shake();
                contactRef.current.focus();
                setError('A number is required');
                return;
            }
            const userContact = await SetContact(email, contactId);
            if(!userContact)
                throw 'An error has occurred by linking the use to the user';
            setUserData( current => ({...current, contact: userContact }));
            GoToHome();
            setVisible(false);
        } catch (error) {
            setError(error);
        }finally{
            setLoading(false);
        }
    }
    const openModal = ()=>{
        setVisible(true);
        setContactId(null);
    }

  return <View style={styles.container }>
    <View style={ styles.title }>
        <MaterialIcons name='error-outline' color='red' size={50} />
        <Text h2> 403 Forbidden </Text>
    </View>
    <Text h4>
        You may not have contact information associated with your account
    </Text>
    <Button onPress={ closeSession }> Close Session </Button>
    { esAdmin && <Button type='clear' onPress={ openModal }> Change contact  </Button>}
    <Dialog isVisible={ visible } onBackdropPress={ ()=> { if(loading) return;  setVisible(false); } } >
        <Dialog.Title title='Change user contact'/>
        <Input 
            name='contactId' 
            keyboardType='numeric' 
            placeholder='ContactId'
            ref={ contactRef } 
            onChangeText={ newValue => setContactId(newValue) }
            errorMessage={ error }
            value={ contactId }
            disabled={ loading }/>
        { loading && <LinearProgress /> }
        <Dialog.Actions >
            <Dialog.Button disabled={ loading } title='Confirm' color='primary' onPress={ onChangeContactPress }/>
            <Dialog.Button disabled={ loading } title='Cancel' color='primary'  type='clear' onPress={()=> setVisible( false )}/>
        </Dialog.Actions>
    </Dialog>
  </View>
}
