import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native-web';

export const CardContainer = styled.View`
    width: 100%
    height: 15%
    padding: 5%
`

export const InfoContainer = styled.View`
    display: flex
    flexDirection: row
    alignItems: center
`

export const ImageContainer = styled.TouchableOpacity`
    height: 95px
    width: 95px
    borderRadius: 50px
`

export const CoverImage = styled.Image.attrs(props =>({
    source: props.source
}))`
    height: 95px
    width: 95px
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

