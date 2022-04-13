import styled from 'styled-components/native'

export const MainContainer = styled.View`
    width: 100%
    height: 100%
    padding: 2%
`

export const SerieInfoContainer = styled.View`
    marginTop: 2%
    display: flex
    flexDirection: column
    alignItems: center
`

export const SerieTitle = styled.Text`
    marginTop: 2%
    textAlign: center
    fontSize: 22px
`

export const InfoText = styled.Text`
    marginTop: 2%
    fontSize: 16px
    color: gray
`

export const StatusBorder = styled.View.attrs(props => ({
    borderColor: props.color || '#ab47bc'
}))`
    marginTop: 3%
    borderRadius: 5px
    borderWidth: 1px
    padding: 1%
`

export const StatusText = styled.Text`
    fontSize: 13px
    color: ${props =>  props.color || '#ab47bc'}
`

export const ChaptersContainer = styled.Text`
    marginTop: 5%
    width: 100%
`

export const ChaptersSeparator = styled.Text`
    width: 100%
    marginTop: 6%
    display: flex
    flexDirection: row
    alignItems: center
    justifyContent: space-between
`

export const Separator = styled.View`
    width: 100%
    height: 2px
    marginTop: 2%
    backgroundColor: #d9d9d9
`