import React, {useEffect} from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import {
    MainContainer,
    NoProfileContainer,
    NoProfileText,
    NoProfileImage,
    LoginButton,
    ButtonText,
    ProfileContainer,
    NoImage,
    InfoText,
    InfoContainer,
    ToolBar
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
        <MainContainer>
            <ToolBar>
                <Feather name="edit-2" size={25} color="gray" />
                <MaterialIcons name="logout" size={25} color="red" />
            </ToolBar>
            <ProfileContainer>
                <NoImage />
                <InfoContainer>
                    <InfoText>{`${user?.firstName} ${user?.lastName}`}</InfoText>
                    <InfoText>{user?.email}</InfoText>
                </InfoContainer>
            </ProfileContainer>
        </MainContainer>
    )
}

export default ProfilePage;