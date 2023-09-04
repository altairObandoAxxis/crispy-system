import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { logout } from '../../util/login';
import { useContext } from 'react';
import { UserContext } from '../../util/UserContext';
const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
    return <View>
      <Text> Pagina de inicio </Text>
      <Button
        title='Go to details'
        onPress={ logout }
      />
    </View>
}
  
const ProfileScreen = ({ navigation, route }) => {
    const userContext = useContext(UserContext);
    return <View>
        <Text> { userContext.state.userInfo.nombre } </Text>
    </View>
}


export const IndexTabs = ()=>{
    return <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerLeft: ()=> <AntDesign name="appstore1" size={24} color="white" />, headerTintColor:'white', headerStyle:{ backgroundColor: 'rgb(0, 120, 212)' } }}>
            <Tab.Screen 
                name='Home' 
                component={ HomeScreen } 
                options={{
                    tabBarIcon : ({color, size }) =><AntDesign name='home' color={ color } size={ size } />,
                    tabBarShowLabel: false,
                    headerTitle: 'Main'}}/>
            <Tab.Screen 
                name='Claims' 
                component={ ProfileScreen } 
                options={{ tabBarIcon : ({color, size }) =><AntDesign name='medicinebox' color={ color } size={ size } />,
                tabBarShowLabel: false}}/>
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