import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native-web';

export const CardContainer = styled.TouchableOpacity`
    width: 100%
    padding: 2%
`

export const InfoContainer = styled.View`
    display: flex
    flexDirection: row
    alignItems: center
`

export const CoverImage = styled.Image.attrs(props =>({
    source: props.source
}))`
    height: 100%
    width: 25%
    borderRadius: 50px
`

export const DataSerie = styled.View`
    display: flex
    flexDirection: column
    justifyContent: center
    marginLeft: 5%
`

export const TittleText = styled.Text`
    fontSize: 18px
`

export const InfoText = styled.Text`
    fontSize: 16px
    color: gray
`

