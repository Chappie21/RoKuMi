import React, { useState, useEffect } from 'react';
import { Text } from 'react-native'

// COMPONENTES
import {
    CommentContainer, 
    CommentInfo, 
    CommentText, 
    DateText, 
    HeaderComment, 
    ImageContainer, 
    MainContaier, 
    ReplyButton, 
    Separator, 
    UserNameText
} from './CommentCard.styled'
import AvatarImage from '../AvatarImage/AvatarImage'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CommentCard = ({ user, userImage, date, text, isReply = false, parentText, replyPress }) => {

    return (
        <CommentContainer
            isReply={isReply}
        >
            {/* Avatar del Usuario */}
            <ImageContainer>
                <AvatarImage
                    size={55}
                    src={userImage}
                />
            </ImageContainer>

            {/* Informacion del comentario */}
            <CommentInfo>

                <HeaderComment>
                    <UserNameText>
                        {user}
                    </UserNameText>

                    <DateText>
                        {date}
                    </DateText>
                </HeaderComment>
                <CommentText>
                    {text}
                </CommentText>
            </CommentInfo>

            {/* Boton de respuesta */}
            <ReplyButton
                onPress={replyPress}
            >
                <MaterialCommunityIcons name='reply' size={24} color='#ab47bc' />
            </ReplyButton>
        </CommentContainer>
    )


}

export default CommentCard;