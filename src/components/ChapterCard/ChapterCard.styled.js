import styled from 'styled-components/native'

export const CardContainer = styled.TouchableOpacity`
    width: 100%
    padding: 2%
`
export const MainContainer = styled.View`
    display: flex
    flexDirection: row
    alignItems: center
    justifyContent: space-between
`

export const InfoContainer = styled.View`

`

export const InfoText = styled.Text`
    color: ${props => props.color || 'black'}
`
