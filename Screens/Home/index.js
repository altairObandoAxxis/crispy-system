import React from 'react';
import { Button, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { logout } from '../../util/login';
import { UserContext } from '../../util/UserContext';
import { Index as Policies } from '../../Components/LifePolicy/Index';
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

    const { state:{ totalPolicy, totalClaims, totalPayments }} = React.useContext(UserContext);

    return <Tab.Navigator initialRouteName='Home' screenOptions={{ headerLeft: ()=> <AntDesign name="appstore1" size={24} color="white" />, headerTintColor:'white', headerStyle:{ backgroundColor: 'rgb(0, 120, 212)' } }}>
    <Tab.Screen 
        name='Home' 
        component={ Dashboard } 
        options={{
            tabBarIcon : ({color, size }) =><AntDesign name='home' color={ color } size={ size } />,
            tabBarBadge: 3,
            tabBarShowLabel: false,
        headerTitle: 'Main'}}/>
    <Tab.Screen 
        name='Policies' 
        component={ Policies } 
        options={{ tabBarIcon : ({color, size }) =><AntDesign name='Safety' color={ color } size={ size }/>,
        tabBarBadge: !totalPolicy ? null :  totalPolicy > 0 && totalPolicy<100 ? totalPolicy : '+99', 
        tabBarShowLabel: false}}/>
    <Tab.Screen 
        name='Claims' 
        component={ ProfileScreen }
        options={{ tabBarIcon : ({color, size }) =><AntDesign name='warning' color={ color } size={ size } />,
        tabBarBadge: !totalClaims ? null :  totalClaims > 0 && totalClaims<100 ? totalClaims : '+99',
        tabBarShowLabel: false,
        headerTitle:'Claims'}}/>
    <Tab.Screen 
        name='Payments' 
        component={ ProfileScreen }
        options={{ tabBarIcon : ({color, size }) =><AntDesign name='calendar' color={ color } size={ size } />,
        tabBarBadge: !totalPayments ? null :  totalPayments > 0 && totalPayments<100 ? totalPayments : '+99',
        tabBarShowLabel: false,
        headerTitle:'Income Payments'}}/>
    <Tab.Screen 
        name='Profile' 
        component={ ProfileScreen } 
        options={{ tabBarIcon : ({color, size }) =><AntDesign name='user' color={ color } size={ size } />,
        tabBarShowLabel: false}}/>
</Tab.Navigator>
}