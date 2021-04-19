import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from './screens/Home';
import Add from './screens/Add';
import { active, background, inactive } from './style/Colors'
import { View } from 'react-native';
const Tab = createBottomTabNavigator();

export default () => {
    const screenOpt = ({route}) => ({
        tabBarIcon: ({ focused, color, size}) => {
            let iconName;
            
            if(route.name === "Home"){
                iconName = focused ? 'home' : 'home-outline'
            }else if(route.name === "Add"){
                iconName = focused? "add-circle" : "add-circle-outline"
            }
            const styleFocused = {
                justifyContent: 'center', 
                alignItems: 'center', 
                marginBottom: 10, 
                backgroundColor: background, 
                height: 70, 
                width: 70, 
                borderRadius: 50
            }

            return (
                <View style={focused ? styleFocused : ""}>
                    <Ionicons name={iconName} size={focused ? 35 : size} color={color} />
                </View>
            )
        }
    }) 
    return (
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName="Home" 
                screenOptions={screenOpt}
                tabBarOptions={{
                    showLabel: false,
                    activeTintColor: active,
                    inactiveTintColor: inactive,
                    style: {
                        backgroundColor: background
                    }
                }}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Add" component={Add} />
            </Tab.Navigator>
      </NavigationContainer>
    );
  }