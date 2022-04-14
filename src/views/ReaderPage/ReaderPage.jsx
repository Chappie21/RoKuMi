import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Dimensions, Image, TouchableOpacity, View } from 'react-native'

// COMPONENTS
import {
    IconOption,
    MainContainer,
    OptionRow,
    OptionsMenu,
    OptionText,
    PagesContainer
} from './ReaderPage.styled'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import { Ionicons } from '@expo/vector-icons';


// API
import { getChapter } from '../../api/chapters';

const ReaderPage = ({ navigation, route }) => {

    const [chapter, setChapter] = useState(route?.params.chapter);
    const [pages, setPages] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [verticalMode, setVerticalMode] = useState(true);

    let carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    const { width, height } = Dimensions.get('screen');

    const SLIDER_WIDTH = width;
    const ITEM_WIDTH = width;
    const ITEM_HEIGHT = height / 2;
    const SLIDER_HEIGHT = height;

    useState(async () => {
        navigation.setOptions({
            title: chapter.chapterName,
            headerTitleAlign: 'center',
            headerRight: () => {
                return (
                    <TouchableOpacity
                        onPress={() => handleShowMenu()}
                    >
                        <Ionicons name="ios-settings-outline" size={24} color="gray" />
                    </TouchableOpacity>
                )
            }
        })

        const data = await getChapterPages();
        setPages(data);
    }, [])

    async function getChapterPages() {
        try {
            const response = await getChapter(chapter.idChapter);
            return response.chapterInfo.pages;
        } catch (error) {
            console.log(error);
        }
    }

    const renderItems = ({ item }) => {
        return (
            <View>
                <Image
                    source={{ uri: item }}
                    style={{ resizeMode: 'cover', width: ITEM_WIDTH, height: ITEM_HEIGHT }}
                />
            </View>
        )
    }

    const handleShowMenu = () =>{
       
    }

    return (
        <MainContainer>
            <PagesContainer>
                {
                    pages.length !== 0
                        ?
                        < Carousel
                            vertical={verticalMode}
                            layout='tinder'
                            ref={carouselRef}
                            data={pages}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            itemHeight={ITEM_HEIGHT}
                            sliderHeight={SLIDER_HEIGHT}
                            keyboardShouldPersistTaps="always"
                            lockScrollWhileSnapping
                            lockScrollTimeoutDuration={200}
                            renderItem={renderItems}
                            getItemLayout={(_, index) => ({
                                length: ITEM_HEIGHT,
                                offset: ITEM_HEIGHT * index,
                                index,
                            })}
                            snapToInterval={ITEM_HEIGHT}
                            onSnapToItem={index => setPageNumber(index)}
                            initialScrollIndex={3}
                        />
                        : null
                }
            </PagesContainer>
        </MainContainer>
    )

}

export default ReaderPage;