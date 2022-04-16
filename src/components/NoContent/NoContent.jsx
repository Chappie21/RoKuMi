import React, { useState, useEffect } from 'react';
import {Image} from 'react-native'
// COMPONENTS
import {
    MainContainer,
    MessageText,
    NoContentImage,
} from './NoContent.styled'

const NoContent = ({message, yCenter = true, xCenter = true}) =>{

    const images = [
        require('../../assets/NoContent.png'),
        require('../../assets/NoContent2.png'),
        require('../../assets/NoContent3.png'),
        require('../../assets/NoContent4.png'),
        require('../../assets/NoContent5.png'),
        require('../../assets/NoContent6.png')
    ]
    
    const imageRandom = images[Math.floor(Math.random() * images.length)];

    return(
        <MainContainer
            xCenter={xCenter}
            yCenter={yCenter}
        >
            <NoContentImage source={imageRandom}/>
            <MessageText>{message}</MessageText>
        </MainContainer>
    )
}

export default NoContent;