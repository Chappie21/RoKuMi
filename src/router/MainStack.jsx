import React, { useEffect, useState } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Views
import TabsPage from '../views/TabsPage/TabsPage';
import LoginPage from '../views/LoginPage/LoginPage';
import RegisterPage from '../views/RegisterPage/RegisterPage';

// COMPONENTS
import Loading from '../components/Loading';

// STORE
import { useDispatch } from "react-redux";

// ACTIONS
import { setUser } from '../store/actions/UserActions';

// UTILS
import { checkIfTokenExpired } from '../utils/TokenFunctions';
import AddSeriePage from '../views/AddSeriePage/AddSeriePage';
import SerieProfilePage from '../views/SerieProfilePage/SerieProfilePage';
import AddChapterPage from '../views/AddChapterPage/AddChapterPage';
import ImageBrowserPage from '../views/ImageBrowserPage/ImageBrowserPage';
import ReaderPage from '../views/ReaderPage/ReaderPage';


const Stack = createNativeStackNavigator();

// Componente de navegacion
const MainStack = () => {

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(async () => {
        setLoading(true);
        const user = JSON.parse(await AsyncStorage.getItem("USER"));
        if (user) {
            if (checkIfTokenExpired(user.access_token)) {
                await AsyncStorage.removeItem("USER");
            } else {
                dispatch(setUser(user));
            }
        }
        setLoading(false);
    }, []);


    return (
        <>
            <Loading enabled={loading} />
            <NavigationContainer
                theme={{
                    colors: {
                        background: "#ffff",
                        card: "#fff",
                        text: "#1A1A1A",
                        border: "#797979",
                        primary: "#ab47bc",
                        notification: "#ffff"
                    },
                    dark: false
                }}
            >
                <Stack.Navigator>
                    <Stack.Screen
                        name='TabsPage'
                        options={{ headerShown: false }}
                        component={TabsPage}
                    />
                    <Stack.Screen
                        name='LoginPage'
                        options={{ title: 'Login' }}
                        component={LoginPage}
                    />
                    <Stack.Screen
                        name='RegisterPage'
                        options={{ title: 'Register' }}
                        component={RegisterPage}
                    />
                    <Stack.Screen
                        name='AddSeriePage'
                        options={{ title: 'Add Serie' }}
                        component={AddSeriePage}
                    />
                    <Stack.Screen
                        name='SerieProfilePage'
                        component={SerieProfilePage}
                    />
                    <Stack.Screen
                        name='AddChapterPage'
                        options={{ title: 'Add new chapter' }}
                        component={AddChapterPage}
                    />
                    <Stack.Screen
                        name='ImageBrowserPage'
                        component={ImageBrowserPage}
                        options={{ title: 'Selected 0 Pages'}}
                    />
                   <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen
                            name='ReaderPage'
                            component={ReaderPage}
                        />
                   </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}


export default MainStack;

