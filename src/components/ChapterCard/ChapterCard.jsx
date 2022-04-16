import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
// COMPONENTES
import {
    CardContainer,
    InfoContainer,
    MainContainer,
    InfoText
} from './ChapterCard.styled'
import { AntDesign } from '@expo/vector-icons';

const ChapterCard = ({ name, chapterNumber, publishedDate, isOwned = false, onPress, onDelete }) => {
    return (
        <CardContainer
            onPress={onPress}
        >
            <MainContainer>
                <InfoContainer>
                    <InfoText>{`${chapterNumber}:  ${name}`}</InfoText>
                    <InfoText color='gray'>{publishedDate}</InfoText>
                </InfoContainer>
                {
                    isOwned &&
                    <TouchableOpacity
                        onPress={onDelete}
                    >
                        <AntDesign name="delete" size={25} color="red" />
                    </TouchableOpacity>
                }
            </MainContainer>
        </CardContainer>
    )
}

export default ChapterCard;