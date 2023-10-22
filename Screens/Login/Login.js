import React, { createRef, useState } from 'react';
import { Button, Card, Input, Text } from '@rneui/themed';
import { Alert, Image, View } from 'react-native';
import { newLogin } from '../../util/login';
import { useContext } from 'react';
import { UserContext } from '../../util/UserContext';
import { LinearProgress } from '@rneui/base';
import { AntDesign } from '@expo/vector-icons';

export const Login =({ navigation })=>{
    const [ username, setUserName ] = useState();
    const [ password, setPassword ] = useState();
    const [ userError, setUserError ]= useState();
    const [ passError, setPassError ]= useState();
    const [ loading, setLoading ] = useState(false);
    const [ secure, setSecure  ]  = useState(true);

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
            if(!ok){
                Alert.alert('Error', 'Username or password wrong');
                return
            }
            userContext.setData({ userLogged: ok, token, user: userInfo });
            userContext.state.ShowLogin(true);
        } catch (error) {
            console.warn(error);
        }finally{
            setLoading(false);
        }
    }

    return <View style={{ flexDirection: 'column', alignItems:'center', height: '100%', justifyContent:'center' }}>
        <Image source={ require('../../assets/sisIcon.png')} />
        <View style={{ marginTop: 25, marginBottom: 15 }}>
            <Text h4 > Welcome to SISos</Text>
        </View>
        <Card containerStyle={{ width: '95%', marginTop: '15'}} >
            <Input 
                placeholder='Username' 
                onChangeText={ value => setUserName(value)} 
                ref={ userRef } 
                errorMessage={ userError }
                autoComplete='username'
                disabled={loading}
                leftIcon={ <AntDesign name='user' size={24}/>}
                label='Username'/>
            <Input 
                placeholder='Password'
                label='Password'
                autoComplete='password'
                onChangeText={ value => setPassword(value)} 
                secureTextEntry={ secure } 
                ref={ passRef } 
                errorMessage={ passError }
                disabled={loading}
                leftIcon={ <AntDesign name='lock' size={24}/>}
                rightIcon={<AntDesign name={ secure ? 'eye': 'eyeo' } size={24} color='black' onPress={ ()=> setSecure(!secure) } /> }/>
            <Button
                onPress={ onLoginPress }>Login</Button>
            { loading && <LinearProgress style={{ marginTop: 10, width: '100%' }} variant='indeterminate' color='primary' />}
        </Card>
    </View>
}