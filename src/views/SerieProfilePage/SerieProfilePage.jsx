import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Alert, View } from 'react-native'
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
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-root-toast'


// API
import { getSerieData, getFollowSerieById, getStopFollowSerieById, deleteSerieById } from '../../api/series';
import { deleteChapter } from '../../api/chapters';

// UITLS
import { getDateFormat } from '../../utils/DateFormat';


const SerieProfilePage = ({ navigation, route }) => {

    const user = useSelector(state => state.user.user);
    const [serie, setSerie] = useState(route.params);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFollow, setIsFollow] = useState(false);
    const isOwned = user ? (serie?.posted_by.idUser === user?.idUser || user?.role === 'administrator') : false

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
            setIsFollow(data.following || false);
        })
        return willFocusSubscription;
    }, [])

    const getChapters = async (serie) => {
        try {
            setLoading(true);
            const response = await getSerieData(serie);
            setLoading(false);

            if (response.status === 200) {
                return response.data;
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const handleFollowSerie = async () => {

        // confirmar si el usuario esta autenticado
        if (user) {

            let response;

            if (!isFollow) {
                // Followrd serie
                response = await getFollowSerieById(serie.idSerie);

                if (response.status === 201) {
                    setIsFollow(true);
                    Toast.show(`Following ${serie.name}`, {
                        duration: Toast.durations.SHORT,
                        backgroundColor: 'white',
                        textColor: 'black',
                        position: -50
                    });
                }

            } else {
                // UnFollow serie
                response = await getStopFollowSerieById(serie.idSerie);

                if (response.status === 200) {
                    setIsFollow(false);
                    // Followed Message
                    Toast.show(`Unfollowing ${serie.name}`, {
                        duration: Toast.durations.SHORT,
                        backgroundColor: 'white',
                        textColor: 'black',
                        position: -50
                    });
                }
            }

            if (response.status !== 200 && response.status !== 201) {
                Alert.alert(
                    '',
                    response.message,
                    [{
                        text: 'OK',
                        style: 'cancel'
                    }]
                )
            }


        } else {
            Alert.alert(
                'You are not logged in',
                'Sign in to enjoy other features',
                [
                    {
                        text: 'Nah',
                        style: 'cancel'
                    },
                    {
                        text: 'Login in!',
                        onPress: () => navigation.push('LoginPage')
                    }
                ]
            )
        }

    }

    const previulyDelete = () => {
        Alert.alert(
            'Are you sure?',
            '',
            [
                {
                    text: "It's a prank bro",
                    style: 'cancel'
                },
                {
                    text: "Yes, i hate this.",
                    onPress: () => handleDeleteSerie()
                }
            ]
        )
    }

    const handleDeleteSerie = async () => {
        try {
            setLoading(true);
            const response = await deleteSerieById(serie.idSerie);
            setLoading(false);

            if (response.status === 200) {
                Toast.show(`Deleted ${serie.name}`, {
                    duration: Toast.durations.SHORT,
                    backgroundColor: 'white',
                    textColor: 'black',
                    position: -50
                });
                navigation.goBack();
            } else {
                Alert.alert(
                    '',
                    response.message,
                    [{
                        text: 'OK',
                        style: 'cancel'
                    }]
                );
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const previuslyDeleteChapter = (chapter) => {
        Alert.alert(
            'Are you sure?',
            '',
            [
                {
                    text: "Mmmmm, nop",
                    style: 'cancel'
                },
                {
                    text: "Yes, bro",
                    onPress: () => handleDeleteChapter(chapter)
                }
            ]
        )
    }

    const handleDeleteChapter = async (chapter) => {
        try {

            setLoading(true);
            const response = await deleteChapter(chapter.idChapter);
            setLoading(false);

            if(response.status === 200){

                // delete chapter eliminated
                let newChapterList = chapters.filter(chap => chap.idChapter !== chapter.idChapter);

                setChapters(newChapterList);

                Toast.show(`Deleted ${chapter.chapterName}`, {
                    duration: Toast.durations.SHORT,
                    backgroundColor: 'white',
                    textColor: 'black',
                    position: -50
                });
            }else{
                Alert.alert(
                    '',
                    response.message,
                    [{
                        text: 'OK',
                        style: 'cancel'
                    }]
                );
            }

        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    return (
        <MainContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Loading enabled={loading} />

                {
                    isOwned &&
                    <OptionsBar>
                        <TouchableOpacity
                            onPress={previulyDelete}
                        >
                            <AntDesign name="delete" size={25} color="red" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.push('AddSeriePage', { editMode: true, serie: serie })}
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
                        onPress={handleFollowSerie}
                    >
                        <AntDesign name={isFollow ? 'heart' : 'hearto'} size={24} color='#ab47bc' />
                    </TouchableOpacity>
                </ChaptersSeparator>
                <Separator />
                {
                    chapters.length !== 0
                        ?
                        chapters.map((chapter, index) =>
                            <View key={index}>
                                <ChapterCard
                                    name={chapter?.chapterName}
                                    chapterNumber={chapter?.chapter_number}
                                    publishedDate={getDateFormat(chapter?.released)}
                                    isOwned={isOwned}
                                    onPress={() => navigation.push('ReaderPage', { chapter: chapter })}
                                    onDelete={() => previuslyDeleteChapter(chapter)}
                                />
                                <Separator />
                            </View>
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