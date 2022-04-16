import styled from 'styled-components/native'

export const MainContainer = styled.View`
    width: 100%
    height: 550px
    display: flex
    ${props => props.xCenter ? 'justifyContent: center' : ''}
    alignItems: center
`

export const NoContentImage = styled.Image.attrs(props =>({
    source: props.source
}))`
    width: 200px
    height: 200px
`

export const MessageText = styled.Text`
    fontSize: 20px
    color: #ab47bc
`