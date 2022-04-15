import styled from 'styled-components/native';

export const CommentContainer = styled.View.attrs(props => ({
    backgroundColor: props?.isReply ? '#F0F1F4' : 'white',
    marginLeft: props?.isReply ? '8%' : '0%',
    marginTop: props?.isReply ? '3%' : '3%',
    width: props?.isReply ? '90%' : '100%',
}))`
    padding: 2%
    display: flex
    flexDirection: row
    justifyContent: space-between
    alignItems: center
    borderRadius: 5px
`

export const MainContaier = styled.Text`
    display: flex
    flexDirection: row
    justifyContent: space-between
    alignItems: center
    borderRadius: 5px
`

export const ImageContainer = styled.View`
    flex: 1
`

export const CommentInfo = styled.View`
    flex: 4
`

export const HeaderComment = styled.View`
    display: flex
    flexDirection: row
    alignItems: center
    justifyContent: space-between
`

export const UserNameText = styled.Text`
    fontSize: 13px
    fontWeight: bold
`

export const DateText = styled.Text`
    color: gray
`

export const CommentText = styled.Text`
    fontSize: 12px
`

export const ReplyButton = styled.TouchableOpacity`
    flex: 1
    display: flex
    justifyContent: center
    alignItems: center
`

export const Separator = styled.View`
    width: 100%
    height: 1px
    marginTop: 2%
    backgroundColor: #d9d9d9
`