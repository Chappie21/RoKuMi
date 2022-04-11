import styled from 'styled-components/native'
import { TextInput as MaterialTextInput, Colors, HelperText } from "react-native-paper";

export const MainContainer = styled.View`
    width: 100%
    height: 100%
    padding: 2%
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

export const TextArea = styled(MaterialTextInput).attrs((props) => ({
    placeholderTextColor: props.theme.gray,
    selectionColor: props.theme.darkAccent,
    mode: 'outlined',
    activeOutlineColor: Colors.purple400,
    dense: false,
    autoCapitalize: 'none',
    numberOfLines: 5,
}))`
    width: 90%
    height: 200px
    marginBottom: 15px
`;

export const InfoText = styled(HelperText)`
    width: 95%
    marginTop: -18px
`;

// Formulario
export const FormConatiner = styled.View`
    marginTop: 5%
    width: 100%
    display: flex
    flexDirection: column
    alignItems: center
    justifyContent: center
`

export const AddButton = styled.TouchableOpacity`
    width: 90%
    height: 50px
    marginTop: 5%
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