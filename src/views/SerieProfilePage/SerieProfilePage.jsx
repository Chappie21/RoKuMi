import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from "react-redux";

// COMPONENTS
import {
    AddButton,
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
import ChapterCard from '../../components/ChapterCard/ChapterCard';
import AvatarImage from '../../components/AvatarImage/AvatarImage';
import NoContent from '../../components/NoContent/NoContent';
import Loading from '../../components/Loading'
import { Ionicons } from '@expo/vector-icons';

// API
import { getChaptersOfSerie } from '../../api/series';

// UITLS
import { getDateFormat } from '../../utils/DateFormat';


const SerieProfilePage = ({ navigation, route }) => {

    const user = useSelector(state => state.user.user);
    const [serie, setSerie] = useState(route.params);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFollow, setIsFollow] = useState(false);
    const isOwned = serie?.posted_by.idUser === user.idUser;

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
        const data = await getChapters(serie.idSerie);
        setChapters(data || []);

    }, [])

    const getChapters = async (serie) => {
        try {
            setLoading(true);
            const response = await getChaptersOfSerie(serie);
            setLoading(false);

            if (response.status === '200') {
                return response.data.chapters;
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <MainContainer>
            <ScrollView>
                <Loading enabled={loading} />
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
                    <TouchableOpacity
                        onPress={() => setIsFollow(!isFollow)}
                    >
                        <AntDesign name={isFollow ? 'heart' : 'hearto'} size={24} color='#ab47bc'/>
                    </TouchableOpacity>
                </ChaptersSeparator>
                <Separator />
                {
                    chapters.length !== 0
                        ?
                        chapters.map(chapter =>
                            <ChapterCard
                                key={chapter?.idChapter}
                                name={chapter?.chapterName}
                                chapterNumber={chapter?.chapter_number}
                                publishedDate={getDateFormat(chapter?.released)}
                                isOwned={isOwned}
                            />
                        )
                        : <NoContent message="No chapters at the moment" xCenter={false}/>
                }
                {
                    isOwned &&
                    <AddButton>
                        <Ionicons
                            style={{ marginLeft: 11 }}
                            name="add-outline"
                            size={45} color="white"
                        />
                    </AddButton>
                }
            </ScrollView>
            <AddButton>
                <Ionicons
                    style={{ marginLeft: 11 }}
                    name="add-outline"
                    size={45} color="white"
                />
            </AddButton>
        </MainContainer>
    )
}

export default SerieProfilePage;