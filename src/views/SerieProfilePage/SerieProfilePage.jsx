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
    OptionsBar,
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
import { Feather } from '@expo/vector-icons';


// API
import { getSerieData } from '../../api/series';

// UITLS
import { getDateFormat } from '../../utils/DateFormat';



const SerieProfilePage = ({ navigation, route }) => {

    const user = useSelector(state => state.user.user);
    const [serie, setSerie] = useState(route.params);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFollow, setIsFollow] = useState(false);
    const isOwned = (serie?.posted_by.idUser === user.idUser) || user.role === 'administrator';

    // Color de texto para borde y texto dependiendo del status de la serie
    const colorStatus = {
        progress: '#ab47bc',
        finished: 'green',
        cancelled: 'red',
    };


    useEffect(async () => {
        const willFocusSubscription = navigation.addListener('focus', async () => {
            // Establecer titulo de la vista con titulo de la serie
            navigation.setOptions({
                title: serie.name
            })

            // Obtener capitulos de la serie visualizada
            const data = await getChapters(serie.idSerie);

            const SerieData = {
                author: data.author,
                cover: data.cover,
                description: data.description,
                idSerie: data.idSerie,
                name: data.name,
                status: data.status,
                posted_by: data.posted_by,
                posting_date: data.posting_date
            }

            setSerie(SerieData);
            setChapters(data.chapters || []);
        })
        return willFocusSubscription;
    }, [])

    const getChapters = async (serie) => {
        try {
            setLoading(true);
            const response = await getSerieData(serie);
            setLoading(false);
            console.log(response);
            if (response.status === 200) {
                return response.data;
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
                
                {
                    isOwned &&
                    <OptionsBar>
                        <TouchableOpacity
                            onPress={() => navigation.push('AddSeriePage', {editMode: true, serie: serie})}
                        >
                            <Feather name="edit-2" size={25} color="gray" />
                        </TouchableOpacity>
                    </OptionsBar>
                }

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
                        <AntDesign name={isFollow ? 'heart' : 'hearto'} size={24} color='#ab47bc' />
                    </TouchableOpacity>
                </ChaptersSeparator>
                <Separator />
                {
                    chapters.length !== 0
                        ?
                        chapters.map((chapter, index) =>
                            <>
                                <ChapterCard
                                    key={chapter?.idChapter}
                                    name={chapter?.chapterName}
                                    chapterNumber={chapter?.chapter_number}
                                    publishedDate={getDateFormat(chapter?.released)}
                                    isOwned={isOwned}
                                    onPress={() => navigation.push('ReaderPage', {chapter: chapter})}
                                />
                                <Separator key={index} />
                            </>
                        )
                        : <NoContent message="No chapters at the moment" xCenter={false} />
                }
            </ScrollView>
            {
                isOwned &&
                <AddButton onPress={() => navigation.push('AddChapterPage', { serieId: serie?.idSerie })}>
                    <Ionicons
                        style={{ marginLeft: 11 }}
                        name="add-outline"
                        size={45} color="white"
                    />
                </AddButton>
            }
        </MainContainer>
    )
}

export default SerieProfilePage;