import React, { useState, useEffect } from 'react';
import { Text, ScrollView } from 'react-native'

// COMPONENTES
import {
    MainContainer
} from './CommentsPage.styled'
import Loading from '../../components/Loading'

// API
import { getCommentsOfChapter } from '../../api/comments';

const CommentsPage = ({ navigation, route }) => {

    const [chapter, setChapter] = useState(route?.params?.chapter);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        const data = await getComments();
        setComments(data);
    }, [])


    const getComments = async () => {
        try {
            
            setLoading(true);
            const response = await getCommentsOfChapter(chapter);
            setLoading(false);
            console.log(response);
            if(response.status === 200){
                return response.comments
            }

        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    return (
        <MainContainer>
            <ScrollView>
                {

                }
            </ScrollView>
        </MainContainer>
    )
}

export default CommentsPage;