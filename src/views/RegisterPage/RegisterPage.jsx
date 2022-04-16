import React, { useState, useEffect } from 'react';
import { Alert, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    FormConatiner,
    MainContainer,
    SubTitle,
    Title,
    TextInput,
    RegisterButton,
    ButtonText,
    InfoText,
    LoginText,
    LoginHiperText
} from './RegisterPage.styled'
import Loading from '../../components/Loading';

// Utils
import validateEmail from '../../utils/EmailValidation';

// API
import { postRegister } from '../../api/auth';

// STORAGE
import { useDispatch } from 'react-redux';

// ANCTIONS
import { setUser } from '../../store/actions/UserActions';

const RegisterPage = ({ navigation }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [equalPasswords, setEqualPasswords] = useState(true);
    const [disbaledButton, setDisabledButton] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    // Validacion de password
    useEffect(() => {
        // Validacion de password por medio de expresion regular
        // * aceptar caracteres alfbaeticoas
        // * aceptar caracteres numericos
        // * la clave debe contener almenos 6 caracteres alfanumericos
        if (
            password?.length >= 6 &&
            /[a-zA-Z]/.test(password) &&
            /[0-9]/.test(password)
        ) {
            setValidPassword(true);
        } else {
            setValidPassword(false);
        }
        // Confirmar si las claves son iguales
        if (
            password &&
            confirmPassword &&
            validPassword &&
            password === confirmPassword
        ) {
            setEqualPasswords(true);
        } else {
            setEqualPasswords(false);
        }
    }, [password, confirmPassword, validPassword, equalPasswords]);

    // Validar correo Electronico
    useEffect(() => {
        setValidEmail(validateEmail(email));
    }, [email])

    // Validar formulario
    useEffect(() => {
        if (firstName && lastName && email && validEmail && equalPasswords) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [firstName, lastName, email, validEmail, equalPasswords])


    const handleRegisterUser = async () => {
        try {
            setIsLoading(true);
            const response = await postRegister(firstName, lastName, email, password);
            setIsLoading(false);

            if (response.status === 201) {
                const { status, message, ...userData } = response;

                await AsyncStorage.setItem('USER', JSON.stringify(userData));

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
            setIsLoading(false);
        }
    }

    return (
        <MainContainer>
            <ScrollView
                contentContainerStyle={{ alignItems: "center" }}
                overScrollMode="never"
            >
                <Loading enabled={isLoading} flat={undefined} />

                <Title>Ro-Ku-Mi</Title>
                <SubTitle>Your reader in always site</SubTitle>

                <FormConatiner>

                    {/* FirstName */}
                    <TextInput
                        label='First Name'
                        value={firstName}
                        onChangeText={setFirstName}
                    />

                    {/* LastName */}
                    <TextInput
                        label='Last Name'
                        value={lastName}
                        onChangeText={setlastName}
                    />

                    {/* Email */}
                    <TextInput
                        label='Email  @'
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                        error={email && validEmail === false}
                    />
                    {
                        email && validEmail === false ?
                            <InfoText type="error">Email not valid</InfoText>
                            : null
                    }

                    {/* Password */}
                    <TextInput
                        label='Password'
                        value={password}
                        secureTextEntry
                        textContentType="oneTimeCode"
                        onChangeText={setPassword}
                        error={password && validPassword === false}
                    />

                    {password && validPassword === false && password?.length < 6 ? (
                        <InfoText type="error">
                            Password must have at least 6 characters
                        </InfoText>
                    ) : password && !/[a-zA-Z]/.test(password) ? (
                        <InfoText type="error">
                            Password must contain at least one letter
                        </InfoText>
                    ) : password && !/[0-9]/.test(password) ? (
                        <InfoText type="error">
                            Password must contain at least one letter
                        </InfoText>
                    ) : null}

                    {/* Confirm Password */}
                    <TextInput
                        label='Confirm Password'
                        value={confirmPassword}
                        secureTextEntry
                        textContentType="oneTimeCode"
                        onChangeText={setConfirmPassword}
                        error={confirmPassword && equalPasswords === false}
                    />
                    {confirmPassword && equalPasswords === false ? (
                        <InfoText type="error">Passwords are not equal</InfoText>
                    ) : null}

                    <RegisterButton
                        disabled={disbaledButton}
                        onPress={handleRegisterUser}
                    >
                        <ButtonText>Komikku no sekai ni hairu</ButtonText>
                    </RegisterButton>

                    <LoginText>
                        Already a reader? <LoginHiperText onPress={() => navigation.goBack()}>  Signin</LoginHiperText>
                    </LoginText>
                </FormConatiner>
            </ScrollView>
        </MainContainer>
    )
}

export default RegisterPage
