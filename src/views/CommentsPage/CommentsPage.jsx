import React, { useState, useEffect } from 'react';
import { Text, ScrollView, Alert } from 'react-native'

// COMPONENTES
import {
    ButtonIcon,
    CommentButton,
    CommentContainer,
    CommentForm,
    MainContainer,
    ReplyComment,
    ReplyCommentText,
    Separator,
    TextInput
} from './CommentsPage.styled'
import Loading from '../../components/Loading'
import CommentCard from '../../components/CommentCard/CommentCard';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

// API
import { getCommentsOfChapter, postCommentByChapter } from '../../api/comments';

// utils 
import { getDateAndHourFormat } from '../../utils/DateFormat';

const CommentsPage = ({ navigation, route }) => {

    const [chapter, setChapter] = useState(route?.params?.chapter);
    const [comments, setComments] = useState([]);
    const [commentsPre, setCommentsPre] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [disbaledButton, setDisabledButton] = useState(true);
    const [comentReply, setComentReply] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(async () => {
        const data = await getComments();
        setComments(data);
        setCommentsPre(RenderComments(data));
    }, [refresh])

    useEffect(() => {
        if (newComment) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true)
        }
    }, [newComment])


    const getComments = async () => {
        try {

            setLoading(true);
            const response = await getCommentsOfChapter(chapter);
            setLoading(false);
            if (response.status === 200) {
                return response.comments
            }

        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    /*const RenderComments = (comment = null, list = []) =>{

        let list = list;




    }*/

    const RenderComments = (comments = null, listComments = []) => {
        let list = [...listComments];

        for (let i in comments) {
            list.push(
                <CommentCard
                    key={comments[i].idComment}
                    userImage={undefined}
                    user={`${comments[i]?.owner?.first_name} ${comments[i]?.owner?.last_name}`}
                    date={getDateAndHourFormat(comments[i]?.posting_date)}
                    text={comments[i]?.text}
                    isReply={comments[i].parent !== null}
                    replyPress={() => setComentReply(comments[i])}
                />
            )

            if (comments[i].children.length !== 0) {
                RenderComments(comments[i].children, list);
            }
        }
        return list
    }

    const hanldeSubmitComment = async () =>{
        try{
            setLoading(true);
            const response = await postCommentByChapter(chapter, newComment, comentReply ? comentReply.idComment : '');
            setLoading(false);

            if(response.status === 201){
                setNewComment('')
                setComentReply(null);
                setRefresh(true);
            }else{
                Alert.alert(
                    '',
                    response.message,
                    [{
                        text: 'OK',
                        style: 'cancel'
                    }]
                )
            }

        }catch(error){
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <MainContainer>
            <Loading enabled={loading} />
            <ScrollView>
                {
                    comments.length !== 0
                        ?
                        commentsPre
                        : null
                }
            </ScrollView>
            <CommentContainer
                isReply={comentReply !== null}
            >
                {
                    comentReply &&
                    <>
                        <ReplyComment>
                            <ReplyCommentText style={{color: 'gray'}}>{`${comentReply?.owner?.first_name} ${comentReply?.owner?.last_name}: ${comentReply?.text}`}</ReplyCommentText>
                            <ButtonIcon
                                onPress={() => setComentReply(null)}
                            >
                                <Feather name="delete" size={24} color="gray" />
                            </ButtonIcon>
                        </ReplyComment>
                        <Separator />
                    </>
                }
                <CommentForm>
                    <TextInput
                        placeholder='Write your comment!'
                        value={newComment}
                        onChangeText={setNewComment}
                    />
                    <CommentButton
                        disabled={disbaledButton}
                        onPress={hanldeSubmitComment}
                    >
                        <MaterialIcons name="send" size={24} color="white" />
                    </CommentButton>
                </CommentForm>
            </CommentContainer>
        </MainContainer>
    )
}

export default CommentsPage;