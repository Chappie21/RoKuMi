import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native'
import { Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

// COMPONENTS
import {
    ChaptersContainer,
    ChaptersSeparator,
    InfoText,
    MainContainer,
    Separator,
    SerieInfoContainer,
    SerieTitle,
    StatusBorder,
    StatusText
} from './SerieProfilePage.styled'

import AvatarImage from '../../components/AvatarImage/AvatarImage'
import { getChaptersOfSerie } from '../../api/series';

const SerieProfilePage = ({ navigation, route }) => {

    const [serie, setSerie] = useState(route.params);
    const [chapters, setChapters] = useState([]);

    // Color de texto para borde y texto dependiendo del status de la serie
    const colorStatus = {
        progress: '#ab47bc',
        finished: 'green',
        cancelled: 'red',
    };


    useEffect(async () => {

        // Establecer titulo de la vista con titulo de la serie
        navigation.setOptions({
            title: serie.name
        })

        // Obtener capitulos de la serie visualizada
        await getChapters(serie.idSerie);

    }, [])

    const getChapters = async (serie) => {
        try {
            console.log(serie);
            const response = await getChaptersOfSerie(serie);

            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollView>
            <MainContainer>

                {/* Informacion principal de la serie */}
                <SerieInfoContainer>
                    <AvatarImage
                        src={serie?.cover}
                        size={200}
                    />
                    <SerieTitle>{serie?.name}</SerieTitle>
                    <InfoText>{serie?.author}</InfoText>
                    <StatusBorder color={colorStatus[serie?.status]}>
                        <StatusText color={colorStatus[serie?.status]}>{serie?.status}</StatusText>
                    </StatusBorder>
                    <InfoText>{`by ${serie?.posted_by?.first_name} ${serie?.posted_by?.last_name}`}</InfoText>
                </SerieInfoContainer>


                <ChaptersSeparator>
                    <InfoText>Chapters</InfoText>
                    <AntDesign name='hearto' size={24} color='#ab47bc' />
                </ChaptersSeparator>
                <Separator />


            </MainContainer>
        </ScrollView>
    )
}

export default SerieProfilePage;