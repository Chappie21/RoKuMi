import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MySeriesPage from '../MySeriesPage/MySeriesPage';
import FollowedSeriesPage from '../FollowedSeriesPage/FollowedSeriesPage';

const Tab = createMaterialTopTabNavigator();

const LibraryPage = ({navigation}) =>{

    return(
        <Tab.Navigator>
            <Tab.Screen name='Followed' component={FollowedSeriesPage}  />
            <Tab.Screen name='MY SERIES' component={MySeriesPage}/>
        </Tab.Navigator>
    )

}

export default LibraryPage;