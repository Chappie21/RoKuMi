import styled from 'styled-components/native'
import { TextInput as MaterialTextInput, Colors } from "react-native-paper";

// Contenedor principal
export const MainContainer = styled.View`
    width: 100%
    height: 100%
`

// Titulo y logo
export const Title = styled.Text`
    marginTop: 30%
    textAlign: center
    fontSize: 28px
`
export const SubTitle = styled.Text`
    textAlign: center
    fontSize: 12px
    color: gray
`
// Formulario
export const FormConatiner = styled.View`
    marginTop: 20%
    width: 100%
    display: flex
    flexDirection: column
    alignItems: center
    justifyContent: center
`

export const TextInput = styled(MaterialTextInput).attrs((props) => ({
    placeholderTextColor: props.theme.gray,
    selectionColor: props.theme.darkAccent,
    mode: 'outlined',
    activeOutlineColor: Colors.purple400,
    dense: false,
    autoCapitalize: 'none',
}))`
    width: 90%
    height: 50px
    marginBottom: 15px
`;

export const LoginButton = styled.TouchableOpacity`
    width: 90%
    height: 50px
    marginTop: 10%
    borderRadius: 10px
    backgroundColor: ${props => props.disabled ? 'gray' : '#ab47bc'}
    display: flex
    justifyContent: center
    alignItems: center 
`

export const ButtonText = styled.Text`
    color: white
    fontSize: 20px
`

export const TextContainer = styled.View`
    display: flex
    flexDirection: row
`

export const RegisterText = styled.Text`
    marginTop: 5%
    color: gray
`
export const RegisterHiperText = styled.Text`
    color: #ab47bc
`