import React, { useState, useEffect } from 'react';
import { Text, ScrollView } from 'react-native'
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

const MySeriesPage = ({ navigation }) => {


    const [series, setSeries] = useState([]);

    useEffect(async () => {
        const series = await getSeries();

        // setear series del usuario en el stado del componente
        setSeries(series || []);
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
                                <>
                                    <CardSerie
                                        key={serie?.id_serie}
                                        name={serie?.name}
                                        author={serie?.author}
                                        postedBy={serie?.posted_by}
                                        postingDate={serie?.posting_date}
                                        cover={serie?.cover}
                                    />
                                    <Separator key={index} />
                                </>
                            )
                        : (
                            <NoUpladSeries>
                                <NoContent message="You haven't posted anything yet"/>
                            </NoUpladSeries>
                        )
                    }
                </MainContainer>
            </ScrollView>
            <AddButton>
                <ButtonContent>
                    <Ionicons
                        style={{marginLeft: 11}}
                        name="add-outline" 
                        size={45} color="white" 
                    />
                </ButtonContent>
            </AddButton>
        </>
    )

}

export default MySeriesPage;