import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { logout } from '../../util/login';
import { UserContext } from '../../util/UserContext';
import PolicyList from '../../Components/LifePolicy/PolicyList';
import Dashboard from './Dashboard';
const Tab = createBottomTabNavigator();

  
const ProfileScreen = ({ navigation, route }) => {
    const userContext = React.useContext(UserContext);
    const closeSession = ()=>{
        logout();
        userContext.setData({});
    }
    return <View>
      <Button
        title='Close Session'
        onPress={ closeSession }
      />
    </View>
}


export const IndexTabs = ()=>{
    return <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerLeft: ()=> <AntDesign name="appstore1" size={24} color="white" />, headerTintColor:'white', headerStyle:{ backgroundColor: 'rgb(0, 120, 212)' } }}>
            <Tab.Screen 
                name='Home' 
                component={ Dashboard } 
                options={{
                    tabBarIcon : ({color, size }) =><AntDesign name='home' color={ color } size={ size } />,
                    tabBarShowLabel: false,
                headerTitle: 'Main'}}/>
            <Tab.Screen 
                name='Policies' 
                component={ PolicyList } 
                options={{ tabBarIcon : ({color, size }) =><AntDesign name='Safety' color={ color } size={ size } />,
                tabBarShowLabel: false}}/>
            <Tab.Screen 
                name='Claims' 
                component={ ProfileScreen }
                options={{ tabBarIcon : ({color, size }) =><AntDesign name='warning' color={ color } size={ size } />,
                tabBarShowLabel: false,
                headerTitle:'Claims'}}/>
            <Tab.Screen 
                name='Payments' 
                component={ ProfileScreen }
                options={{ tabBarIcon : ({color, size }) =><AntDesign name='calendar' color={ color } size={ size } />,
                tabBarShowLabel: false,
                headerTitle:'Income Payments'}}/>
            <Tab.Screen 
                name='Profile' 
                component={ ProfileScreen } 
                options={{ tabBarIcon : ({color, size }) =><AntDesign name='user' color={ color } size={ size } />,
                tabBarShowLabel: false}}/>
        </Tab.Navigator>
    </NavigationContainer>
}