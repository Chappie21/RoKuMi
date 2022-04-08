import React, {useEffect} from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

import {
    MainContainer,
    NoProfileContainer,
    NoProfileText,
    NoProfileImage,
    LoginButton,
    ButtonText
} from './ProfilePage.styled'

const ProfilePage = ({navigation, route}) =>{

    const user = useSelector(state => state.user.user);

    // En caso de no poseer una sesion activa
    if(!user){
        return(
            <NoProfileContainer>
                <NoProfileImage />
                <NoProfileText>
                    You are not logged in
                </NoProfileText>
                <LoginButton onPress = {() => navigation.push('LoginPage')}>
                    <ButtonText>
                        Roguin
                    </ButtonText>
                </LoginButton>
            </NoProfileContainer>
        )
    }

    return(
        <Text>Profile it's Works!</Text>
    )
}

export default ProfilePage;