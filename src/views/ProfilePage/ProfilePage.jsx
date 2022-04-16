import React, { useEffect, useState } from "react";
import { Text, Alert, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
import Loading from "../../components/Loading";

// API
import { logOut } from "../../api/auth";

// ACTIONS
import { setUser } from '../../store/actions/UserActions';

const ProfilePage = ({ navigation, route }) => {

    const user = useSelector(state => state.user.user);

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleLogOut = async () => {
        try {
            setLoading(true);
            const response = await logOut();
            setLoading(false);

            // En caso de cerrar sesion correctamente limpia el LocalStorage y redux
            if (response.loggedOut) {
                await AsyncStorage.removeItem('USER');
                dispatch(setUser(null));

                navigation.push('TabsPage');

            } else {
                Alert.alert(
                    'Error',
                    'logout error, try again',
                    [
                        {
                            text: 'OK',
                            style: 'cancel'
                        }
                    ]

                )
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    // En caso de no poseer una sesion activa
    if (!user) {
        return (
            <NoProfileContainer>
                <NoProfileImage />
                <NoProfileText>
                    You are not logged in
                </NoProfileText>
                <LoginButton onPress={() => navigation.push('LoginPage')}>
                    <ButtonText>
                        Roguin
                    </ButtonText>
                </LoginButton>
            </NoProfileContainer>
        )
    }

    return (
        <MainContainer>
            <Loading enabled={loading}/>
            <ToolBar>
                <TouchableOpacity>
                    <Feather name="edit-2" size={25} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleLogOut}
                >
                    <MaterialIcons name="logout" size={25} color="red" />
                </TouchableOpacity>
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