import React, { useState, useEffect } from 'react';

// COMPONENTES
import {
    CardContainer, 
    InfoContainer, 
    MainContainer, 
    InfoText
} from './ChapterCard.styled'
import { Feather } from '@expo/vector-icons';

const ChapterCard = ({name, chapterNumber, publishedDate, isOwned = false}) => {
    return(
        <CardContainer>
            <MainContainer>
                <InfoContainer>
                    <InfoText>{`${chapterNumber}:  ${name}`}</InfoText>
                    <InfoText color='gray'>{publishedDate}</InfoText>
                </InfoContainer>
                {
                    isOwned &&
                    <Feather name="edit-2" size={25} color="gray"/>
                }
            </MainContainer>
        </CardContainer>
    )
}

export default ChapterCard;