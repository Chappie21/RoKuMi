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
`

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

export const AddPagesButton = styled.TouchableOpacity`
    display: flex
    flexDirection: row
    alignItems: center
    justifyContent: space-between
    width: 90%
    height: 50px
    marginTop: 5%
    borderRadius: 10px
    backgroundColor: white
    display: flex
    justifyContent: center
    alignItems: center 
`

export const ButtonText = styled.Text`
    color: ${props => props.color || 'white'}
    fontSize: 20px
`

export const DropdownPagesButton = styled.TouchableOpacity`
    width: 100%
    display: flex
    flexDirection: row
    alignItems: center
    justifyContent: space-between
    borderRadius: 5px
`

export const NumberPages = styled.Text`
    color: gray
    fontSize: 16px
`

export const DropDownPagesContainer = styled.View`
    marginTop: 2%
    backgroundColor: #EEEFF2
    width: 90%
    borderRadius: 5px
    padding: 2%
    border: gray
`

export const PagesContainer = styled.View`
    marginTop: 2%
`

export const CardPage = styled.View`
    padding: 2%
    width: 100%
    display: flex
    flexDirection: row
    alignItems: center
    justifyContent: space-between
    marginTop: 2%
`

export const Separator = styled.View`
    width: 100%
    height: 1px
    marginTop: 2%
    backgroundColor: #d9d9d9
`