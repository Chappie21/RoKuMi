import React, { useState, useEffect } from 'react';
import { Text, Button, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import FormData from 'form-data';

// COMPONENTS
import {
    MainContainer,
    FormConatiner,
    TextInput,
    AddButton,
    ButtonText,
    AddPagesButton,
    DropdownPagesButton,
    NumberPages,
    DropDownPagesContainer,
    CardPage,
    PagesContainer,
    Separator
} from './AddChapterPage.styled'
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Loading from '../../components/Loading';

// API
import { postNewChapter } from '../../api/chapters';

const AddChapterPage = ({ navigation, route }) => {

    const [chapterName, setChapterName] = useState('');
    const [serie, setSerie] = useState('');
    const [chapterNumber, setChapterNumber] = useState('');
    const [pages, setPages] = useState([]);
    const [disbaledButton, setDisabledButton] = useState(true);
    const [displayPages, setDisplayPages] = useState(false);
    const [loading, setLoading] = useState(false);

    // Set Serie ID
    useEffect(() => {
        setSerie(route.params.serieId || serie);
    }, [])

    // Update Pages List with new Selecte Images en ImageBrowserPage
    useEffect(() => {
        if (route.params.pages) {
            let newPages = [...pages];
            newPages = newPages.concat(route.params.pages);
            setPages(newPages);
        }
    }, [route.params.pages])

    // Checkout Form 
    useEffect(() => {
        if (chapterName && chapterNumber && pages.length !== 0) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true)
        }
    }, [chapterName, chapterNumber, pages])

    const hanldleDeletePage = (path) => {
        const newPagesList = pages.filter(page => page.uri !== path);
        setPages(newPagesList);
    }

    const handleSubmitChapter = async () => {
        try {
            setLoading(true);
            let formData = new FormData();

            formData.append('chapterName', chapterName);
            formData.append('chapterNumber', chapterNumber);

            pages.map(page => {
                formData.append('pages', {
                    uri: page.uri,
                    name: page.name,
                    type: page.type,
                    width: page.width,
                    height: page.height
                })
            })
            console.log(serie);
            const response = await postNewChapter(formData, serie);
            setLoading(false);

            console.log(response);

            if (response.status === 201) {
                Alert.alert(
                    '',
                    response.message,
                    [
                        {
                            style: 'cancel',
                            text: 'OK',
                            onPress: () => navigation.goBack()
                        }
                    ],
                    {
                        onDismiss: () => navigation.goBack()
                    }
                )
            } else {
                Alert.alert(
                    '',
                    response.message,
                    [
                        {
                            style: 'cancel',
                            text: 'OK'
                        }
                    ]
                )
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
                <FormConatiner>

                    {/* Chapter Name */}
                    <TextInput
                        label='Name'
                        value={chapterName}
                        onChangeText={setChapterName}
                    />

                    {/* Serie name */}
                    <TextInput
                        label='Number'
                        value={chapterNumber}
                        onChangeText={setChapterNumber}
                    />

                    {/* Selected pages Dropdown */}
                    <DropDownPagesContainer>
                        <DropdownPagesButton
                            onPress={() => setDisplayPages(!displayPages)}
                        >
                            <NumberPages>{`${pages.length} pages selected`}</NumberPages>
                            <MaterialIcons name={displayPages ? 'keyboard-arrow-down' : 'keyboard-arrow-right'} size={26} color='gray' />
                        </DropdownPagesButton>
                        {
                            pages.length !== 0 && displayPages
                                ?
                                <PagesContainer>
                                    {
                                        pages.map(pages =>
                                            <>
                                                <CardPage key={pages.uri}>
                                                    <Image source={pages} style={{ width: 60, height: 100, borderRadius: 5 }} />
                                                    <TouchableOpacity
                                                        onPress={() => hanldleDeletePage(pages.uri)}
                                                        style={{ marginRight: 10 }}
                                                    >
                                                        <AntDesign name='delete' size={25} color='red' />
                                                    </TouchableOpacity>
                                                </CardPage>
                                                <Separator />
                                            </>
                                        )
                                    }
                                </PagesContainer>
                                : null
                        }
                    </DropDownPagesContainer>


                    <AddPagesButton
                        onPress={() => navigation.push('ImageBrowserPage')}
                    >
                        <Foundation name='page-add' size={24} color='#ab47bc' />
                        <ButtonText color='#ab47bc'>Add Pages</ButtonText>
                    </AddPagesButton>

                    {/* Add button */}
                    <AddButton
                        disabled={disbaledButton}
                        onPress={handleSubmitChapter}
                    >
                        <ButtonText>
                            Add Chapter
                        </ButtonText>
                    </AddButton>

                </FormConatiner>
            </ScrollView>
        </MainContainer>
    )
}

export default AddChapterPage;