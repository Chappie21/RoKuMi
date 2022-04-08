import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, useColorScheme, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Views
import LoginPage from "../LoginPage/LoginPage";
import ProfilePage from "../ProfilePage/ProfilePage";

const Tab = createBottomTabNavigator();

const TabsPage = ({ navigation, route }) => {

    const isDarkMode = useColorScheme() === 'dark'

    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Tab.Navigator screenOptions={tabNavigatorScreenOptions}>
            <Tab.Screen
                name='Library'
                component={LoginPage}
                listeners={{
                    focus: () => {
                        setTabIndex(0)
                    }
                }}
            />
             <Tab.Screen
                name='Profile'
                component={ProfilePage}
                listeners={{
                    focus: () => {
                        setTabIndex(1)
                    }
                }}
            />
        </Tab.Navigator>
    )

    function tabNavigatorScreenOptions({ route, navigation }) {

        let performAnimation = false
        if (navigation.getState().index !== tabIndex) {
            performAnimation = true
        }

        return {
            tabBarIcon: ({ focused, color }) => {
                if (route.name === 'Library') {
                    return focused ? (
                        <>
                            <Ionicons name="library-outline" size={25} color={color} />
                            <Text style={{ color: focused ? color : isDarkMode ? "lightgray" : "gray" }}>
                                {route.name}
                            </Text>
                        </>
                    ) : (
                        <>
                            <Ionicons name="library-outline" size={25} color={color} />
                            <Text style={{ color: focused ? color : isDarkMode ? "lightgray" : "gray" }}>
                                {route.name}
                            </Text>
                        </>
                    );
                }
                else if (route.name === 'Profile') {
                    return focused ? (
                        <>
                            <Ionicons name="person-circle-outline" size={25} color={color} />
                            <Text style={{ color: focused ? color : isDarkMode ? "lightgray" : "gray" }}>
                                {route.name}
                            </Text>
                        </>
                    ) : (
                        <>
                            <Ionicons name="person-circle-outline" size={25} color={color} />
                            <Text style={{ color: focused ? color : isDarkMode ? "lightgray" : "gray" }}>
                                {route.name}
                            </Text>
                        </>
                    );
                }
            },
            tabBarInactiveTintColor: isDarkMode ? 'lightgray' : 'gray',
            tabBarShowLabel: false,
            tabBarStyle: {
                borderTopWidth: 0,
                elevation: 0,
                backgroundColor: isDarkMode ? '#1b1b1b' : '#fff',
                height: Platform.OS === 'ios' ? 80 : 50,
            }
        }
    }

}



export default TabsPage;