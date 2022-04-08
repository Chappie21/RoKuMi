import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native-web';
import { TextInput as MaterialTextInput, Colors, HelperText } from "react-native-paper";

export const MainContainer = styled.View`
    height: 100%
    width: 100%
    display: flex
    padding: 2%
`

export const NoProfileContainer = styled.View`
    height: 100%
    width: 100%
    display: flex
    flexDirection: column
    justifyContent: center
    alignItems: center
`

export const NoProfileText = styled.Text`
    color: #ab47bc
    fontSize: 25px
`

export const NoProfileImage = styled.Image.attrs({
    source: require('../../assets/NoProfile.png')
})`
    width: 45%
    height: 30%
    resizeMode: contain
`

export const LoginButton = styled.TouchableOpacity`
    width: 140px
    height: 45px
    marginTop: 5%
    backgroundColor: #ab47bc
    borderRadius: 4px
    display: flex
    justifyContent: center
    alignItems: center
`

export const ButtonText = styled.Text`
    color: white
`

export const ProfileContainer = styled.View`
    display: flex
    flexDirection: column
    alignItems: center
    justifyContent: center
    height: 90%
`

export const NoImage = styled.Image.attrs({
    source: require('../../assets/RuKoMiLogo.png')
})`
    width: 250px
    height: 250px
    resizeMode: contain
`

export const InfoContainer = styled.View`
    marginTop: 2%
`

export const InfoText = styled.Text`
    color: black
    textAlign: center
    fontSize: 25px
    marginTop: 2%
`

export const ToolBar = styled.View`
    display: flex
    flexDirection: row
    justifyContent: space-between
    alignItems: center
    padding: 2%
`