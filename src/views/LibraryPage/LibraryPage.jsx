import React, { useState, useEffect } from 'react';
import { Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LoginPage from '../LoginPage/LoginPage'
import MySeriesPage from '../MySeriesPage/MySeriesPage';

const Tab = createMaterialTopTabNavigator();

const LibraryPage = ({navigation}) =>{

    return(
        <Tab.Navigator>
            <Tab.Screen name='Followed' component={LoginPage}  />
            <Tab.Screen name='MY SERIES' component={MySeriesPage}/>
        </Tab.Navigator>
    )

}

export default LibraryPage;