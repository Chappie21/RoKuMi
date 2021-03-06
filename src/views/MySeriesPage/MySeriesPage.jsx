import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
// COMPONENTS
import {
    MainContainer,
    Separator,
    AddButton,
    ButtonContent,
    NoUpladSeries
} from './MySeriesPage.styled'
import CardSerie from '../../components/CardSerie/CardSerie';

// API
import { getUserSeries } from '../../api/series';
import NoContent from '../../components/NoContent/NoContent';

// UTILS
import { getDateFormat } from '../../utils/DateFormat';

const MySeriesPage = ({ navigation }) => {


    const [series, setSeries] = useState([]);

    useEffect(async () => {
        const willFocusSubscription = navigation.addListener('focus', async () => {
            const series = await getSeries();

            // setear series del usuario en el stado del componente
            setSeries(series || []);
        })
        return willFocusSubscription;
    }, [])

    // Obtener sereies del usuario
    const getSeries = async () => {
        try {
            const response = await getUserSeries();
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ScrollView>
                <MainContainer>
                    {
                        series.length !== 0 ?
                            series.map((serie, index) =>
                                <View key={index}>
                                    <CardSerie
                                        name={serie?.name}
                                        author={serie?.author}
                                        postedBy={`${serie?.posted_by?.first_name} ${serie?.posted_by?.last_name}`}
                                        postingDate={getDateFormat(serie?.posting_date)}
                                        cover={serie?.cover}
                                        onPress={() => navigation.push('SerieProfilePage', serie)}
                                    />
                                    <Separator />
                                </View>
                            )
                            : (
                                <NoUpladSeries>
                                    <NoContent message="You haven't posted anything yet" />
                                </NoUpladSeries>
                            )
                    }
                </MainContainer>
            </ScrollView>
            <AddButton
                onPress={() => navigation.push('AddSeriePage')}
            >
                <ButtonContent>
                    <Ionicons
                        style={{ marginLeft: 11 }}
                        name="add-outline"
                        size={45} color="white"
                    />
                </ButtonContent>
            </AddButton>
        </>
    )

}

export default MySeriesPage;