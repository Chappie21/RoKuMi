import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View } from 'react-native';

// COMPONENTS
import {
    MainContainer,
    NoFollowedSeries,
    Separator
} from './FollowedSeriesPage.styled'
import NoContent from '../../components/NoContent/NoContent';
import CardSerie from '../../components/CardSerie/CardSerie';

// API
import { getUserTackingList } from '../../api/series';

// utils
import { getDateFormat } from '../../utils/DateFormat';

const FollowedSeriesPage = ({ navigation }) => {

    const [seriesFollowed, setSeriesFollowed] = useState([]);

    useEffect(() => {
        const willFocusSubscription = navigation.addListener('focus', async () => {
            const data = await getTrackingList();
            setSeriesFollowed(data || []);
        })
        return willFocusSubscription;
    }, [])

    const getTrackingList = async () => {
        try {
            const response = await getUserTackingList();

            if (response.status) {
                return response.series;
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ScrollView>
                <MainContainer>
                    {
                        seriesFollowed.length !== 0 ?
                            seriesFollowed.map((serie, index) =>
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
                                <NoFollowedSeries>
                                    <NoContent message="You haven't posted anything yet" />
                                </NoFollowedSeries>
                            )
                    }
                </MainContainer>
            </ScrollView>
        </>
    )
}

export default FollowedSeriesPage;