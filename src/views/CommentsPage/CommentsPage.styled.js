import styled from 'styled-components/native';
import { TextInput as MaterialTextInput, Colors } from "react-native-paper";

export const MainContainer = styled.View`
    width: 100%
    height: 100%
`

export const TextInput = styled(MaterialTextInput).attrs((props) => ({
    placeholderTextColor: props.theme.gray,
    mode: 'outlined',
    activeOutlineColor: Colors.purple400,
    dense: false,
    autoCapitalize: 'none',
}))`
    width: 80%
    height: 50px
`;


export const CommentContainer = styled.View.attrs(props =>({
    backgroundColor: props?.isReply ? '#F0F1F4' : 'white' 
}))`
    width: 100%
    padding: 2%
    borderRadius: 15px
`

export const CommentForm = styled.View`
    width: 100%
    display: flex
    flexDirection: row
    justifyContent: space-between
    alignItems: center
`

export const CommentButton = styled.TouchableOpacity`
    width: 60px
    height: 60px
    borderRadius: 80px
    backgroundColor: ${props => props.disabled ? 'gray' : '#ab47bc'}
    display: flex
    justifyContent: center
    alignItems: center 
`

export const ReplyComment = styled.View`
    display: flex
    flexDirection: row
    alignItems: center
    justifyContent: space-between
    marginBottom: 2%
`

export const ReplyCommentText = styled.Text`
    color: gray
    flex: 7
`

export const Separator = styled.View`
    width: 100%
    height: 1px
    marginBottom: 2%
    backgroundColor: #d9d9d9
`

export const ButtonIcon = styled.TouchableOpacity`
    flex: 1
`