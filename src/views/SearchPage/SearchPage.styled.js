import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native-web';
import { TextInput as MaterialTextInput, Colors, HelperText } from "react-native-paper";

export const MainContainer = styled.View`
    width: 100%
    height: 100%
    padding: 2%
`

export const SeriesContainer = styled.View`
    marginTop: 10%
    width: 100%
    height: 100%
`

export const Separator = styled.View`
    width: 100%
    height: 1px
    marginTop: 2%
    backgroundColor: #d9d9d9
`

export const NoContentMatch = styled.View`
    width: 100%
    height: 100%
    display: flex
    justifyContent: center
    alignContent: center
`