import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native'
import { Searchbar, Text } from 'react-native-paper';
import {
    MainContainer,
    SeriesContainer,
    Separator,
    NoContentMatch
} from './SearchPage.styled';

// Components
import Loading from '../../components/Loading'
import CardSerie from '../../components/CardSerie/CardSerie';
import NoContent from '../../components/NoContent/NoContent';

// API
import { getAllSeries } from '../../api/series';

// UTILS
import { getDateFormat } from '../../utils/DateFormat';

const SearchPage = ({ navigation }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [allSeries, setAllSeries] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        const data = await getSeries();
        setAllSeries(data.data);
        setSeries(data.data);
    }, [])

    useEffect(() =>{
        
        // FILTRO DE BSUQUEDA POR INICIAL DE PALABRA
        const newSeriesList = allSeries.filter(serie => {

            if(
                serie.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                serie.author.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                `${serie?.posted_by?.first_name} ${serie?.posted_by?.last_name}`.toLowerCase().startsWith(searchQuery.toLowerCase())
            ){
                return serie;
            }

        })

        // Establecer series buscadas
        setSeries(newSeriesList);

    }, [searchQuery])

    const onChangeSearch = query => setSearchQuery(query);

    const getSeries = async () => {
        try {
            setLoading(true)
            const response = await getAllSeries();
            setLoading(false);

            if (response.status === "200") {
                return response;
            } else {

            }

        } catch (error) {
            console.log(error);
            setLoading(false);
            return [];
        }
    }

    return (
        <ScrollView>
            <MainContainer>

                <Loading enabled={loading} />

                <Searchbar
                    style={{ marginTop: 10 }}
                    placeholder='Search a Series'
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />

                <SeriesContainer>
                    {
                        series.length !== 0 ?
                            series.map((serie, index) =>
                                <>
                                    <CardSerie
                                        key={serie?.id}
                                        name={serie?.name}
                                        author={serie?.author}
                                        postedBy={`${serie?.posted_by?.first_name} ${serie?.posted_by?.last_name}`}
                                        postingDate={getDateFormat(serie?.posting_date)}
                                        cover={serie?.cover}
                                    />
                                    <Separator key={index} />
                                </>
                            )
                            : (
                               
                                    <NoContent message="We didn't find anything" />
                                
                            )
                    }
                </SeriesContainer>

            </MainContainer>
        </ScrollView>
    )
}

export default SearchPage;