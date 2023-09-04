import React, { createRef, useState } from 'react';
import { Button, Card, Input } from '@rneui/themed';
import { Alert, Image, Text, View } from 'react-native';
import { newLogin } from '../../util/login';
import { useContext } from 'react';
import { UserContext } from '../../util/UserContext';


export const Login =({ navigation })=>{
    const [ username, setUserName ] = useState();
    const [ password, setPassword ] = useState();
    const [ userError, setUserError ]= useState();
    const [ passError, setPassError ]= useState();
    const [ loading, setLoading ] = useState(false);

    const userRef = createRef(),
          passRef = createRef();
    const userContext = useContext(UserContext);
    const onLoginPress = async ()=>{
        try {
            setUserError(null);
            setPassError(null);
            setLoading(true);
            if(!username){
                setUserError('Username is required')
                userRef.current.shake();
                userRef.current.focus();         
                throw 'Username is required';
            }
            if(!password){
                setPassError('Password is required');
                passRef.current.focus();
                passRef.current.shake();
                throw 'Password is required'
            }
            const { ok, token, userInfo } = await newLogin({ email: username, clave: password });
            console.log('resultado', ok )
            if(!ok){
                Alert.alert('Error', 'Username or password wrong');
                return
            }
            userContext.setData({ userLogged: ok, token, userInfo });
        } catch (error) {
            console.warn(error);
        }finally{
            setLoading(false);
        }
    }

    return <View style={{ flexDirection: 'column', alignItems:'center', height: '100%', justifyContent:'center' }}>
        <Image source={ require('../../assets/sisIcon.png')} />

        <Card containerStyle={{ width: '95%', marginTop: '15'}} >
            <Input 
                placeholder='Username' 
                onChangeText={ value => setUserName(value)} 
                ref={ userRef } 
                errorMessage={ userError }
                disabled={loading}/>
            <Input 
                placeholder='Password' 
                onChangeText={ value => setPassword(value)} 
                secureTextEntry={ true } 
                ref={ passRef } 
                errorMessage={ passError }
                disabled={loading}/>
            <Button 
                onPress={ onLoginPress }>Login</Button>
        </Card>
    </View>
}