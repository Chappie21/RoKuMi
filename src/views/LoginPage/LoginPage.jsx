import React, { useEffect, useState } from "react";
import { Alert, ScrollView } from 'react-native'
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import {
    FormConatiner,
    MainContainer,
    SubTitle,
    Title,
    TextInput,
    LoginButton,
    ButtonText,
    RegisterText,
    RegisterHiperText,
} from './LoginPage.styled'
import Loading from "../../components/Loading";

// APÍ
import { postLogin } from "../../api/auth";

// STORE
import { useDispatch } from "react-redux";

// ACTIONS
import { setUser } from '../../store/actions/UserActions';

const LoginPage = ({ navigation }) => {

    const [userNameOrEmail, setUserNameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disbaledButton, setDisabledButton] = useState(true);
    const [isLoading, setIsloading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (userNameOrEmail !== '' && password !== '') {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [userNameOrEmail, password])

    const handleLogin = async () => {
        try {
            setIsloading(true);
            const response = await postLogin(userNameOrEmail, password);
            setIsloading(false);

            if (response.status === 200) {
                const { status, message, ...userData } = response;
                await AsyncStorageLib.setItem('USER', JSON.stringify(userData));

                // Alamacenar datos del usuario en el storage
                dispatch(setUser(userData));

                navigation.push('TabsPage')
            } else {
                Alert.alert(
                    '',
                    response.message,
                    [
                        {
                            style: 'cancel',
                            text: 'OK'
                        }
                    ]
                )
            }

        } catch (error) {
            console.log(error);
            setIsloading(false);
        }
    }

    return (
        <MainContainer>
            <ScrollView
                contentContainerStyle={{ alignItems: "center" }}
                overScrollMode="never"
            >
                <Loading enabled={isLoading} flat={undefined} />


                <Title>Ro-Ku-MI</Title>
                <SubTitle>Your reader everywhere</SubTitle>

                <FormConatiner>

                    {/* Username o Correo*/}
                    <TextInput
                        placeholder="Email @"
                        keyboardType='email-address'
                        value={userNameOrEmail}
                        onChangeText={setUserNameOrEmail}
                    />

                    {/* Password */}
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <LoginButton
                        disabled={disbaledButton}
                        onPress={handleLogin}
                    >
                        <ButtonText>Login now!</ButtonText>
                    </LoginButton>

                    <RegisterText>
                        Don't have account?   <RegisterHiperText onPress={() => navigation.push('RegisterPage')}>SignUp</RegisterHiperText>
                    </RegisterText>
                </FormConatiner>
            </ScrollView>
        </MainContainer>
    )
}

export default LoginPage;