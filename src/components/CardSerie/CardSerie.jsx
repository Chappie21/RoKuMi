import React, { useState, useEffect } from 'react';
import { Text, Image } from 'react-native';

// COMPONENTS
import {
    CardContainer, 
    CoverImage, 
    DataSerie, 
    ImageContainer, 
    InfoContainer, 
    TittleText,
    InfoText
} from './CardSerie.styled'

const CardSerie = ({name, cover, author, postedBy, postingDate, status, onPress}) =>{

    return(
        <CardContainer>
            <InfoContainer>

                {/* Imagen de portada de la serie */}
                <ImageContainer>
                    <CoverImage source={{ uri: cover || '../../assets/RuKoMiLogo.png'}}/>
                </ImageContainer>

                {/* Datos de la serie */}
                <DataSerie>
                    <TittleText>{name}</TittleText>
                    <InfoText>{author}</InfoText>
                    <InfoText>{postedBy}</InfoText>
                    <InfoText>{`upload: ${postingDate}`}</InfoText>
                </DataSerie>

            </InfoContainer>
        </CardContainer>
    )
}

export default CardSerie;