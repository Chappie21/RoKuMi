import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native'
import FormData from 'form-data';

// COMPONENTS
import {
    MainContainer,
    FormConatiner,
    TextInput,
    TextArea,
    AddButton,
    ButtonText
} from './AddSeriePage.styled'
import DropDownPicker from 'react-native-dropdown-picker';
import AvatarImage from '../../components/AvatarImage/AvatarImage';
import Loading from '../../components/Loading';
import { postUploadSerie, putSerieById } from '../../api/series';


const AddSeriePage = ({ navigation, route }) => {

    // Get Page Mode
    const editMode = route?.params?.editMode || false;
    const serieData = route?.params?.serie || null;

    const [serieName, setSerieName] = useState(serieData?.name || '');
    const [serieAuthor, setSerieAuthor] = useState(serieData?.author || '');
    const [serieDescription, setSerieDescription] = useState(serieData?.description || '');
    const [serieStatus, setSerieStatus] = useState(serieData?.status || '');
    const [cover, setCover] = useState(serieData?.cover || null);
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const [disbaledButton, setDisabledButton] = useState(true);
    const [loading, setLoading] = useState(false);

    const stausList = [
        {
            label: 'progress',
            value: 'progress'
        },
        {
            label: 'finished',
            value: 'finished'
        },
        {
            label: 'cancelled',
            value: 'cancelled'
        },
        {
            label: 'No information',
            value: 'No information'
        }
    ];

    // Confirmar formulario
    useEffect(() => {

        if (serieName && serieAuthor && serieStatus && serieDescription) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }

    }, [serieName, serieAuthor, serieStatus, serieDescription])

    const handleSubmitSerie = async () => {
        try {

            const data = generateFormData();

            setLoading(true);
            const response = await postUploadSerie(data);
            setLoading(false);

            if (response.status === "201") {
                navigation.goBack();
            } else {
                Alert.alert(
                    '',
                    response.message,
                    [
                        {
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

    const handleEditSerie = async () => {
        try {
            setLoading(true);
            const formData = generateFormData();

            const response = await putSerieById(formData, serieData.idSerie);
            setLoading(false);

            if (response.status === 200) {
                Alert.alert(
                    '',
                    response.message,
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.goBack()
                        }
                    ]
                )
            } else {
                Alert.alert(
                    '',
                    response.message,
                    [
                        {
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

    const generateFormData = () => {
        const data = new FormData();

        data.append('serieName', serieName);
        data.append('serieAuthor', serieAuthor);
        data.append('serieStatus', serieStatus);
        data.append('serieDescription', serieDescription);

        if (typeof cover !== 'string') {
            const fileType = cover.uri.substr(cover.uri.lastIndexOf('.') + 1)

            data.append('cover', {
                uri: cover.uri,
                height: cover.height,
                width: cover.width,
                name: `${serieName}.${fileType}`,
                type: `image/${fileType}`
            })
        }else{
            data.append('cover', null);
        }

        return data;
    }

    return (
        <ScrollView>
            <Loading enabled={loading} />
            <MainContainer>
                <FormConatiner>
                    {/* Serie Cover */}
                    <AvatarImage
                        marginBottom={20}
                        marginTop={0}
                        src={editMode ? cover : undefined}
                        setImage={setCover}
                    />

                    {/* Serie name */}
                    <TextInput
                        label='Name'
                        value={serieName}
                        onChangeText={setSerieName}
                    />

                    {/* Serie Author */}
                    <TextInput
                        label='Auhtor'
                        value={serieAuthor}
                        onChangeText={setSerieAuthor}
                    />

                    {/* Serie Status */}
                    <DropDownPicker
                        listMode="SCROLLVIEW"
                        open={dropDownVisible}
                        setOpen={setDropDownVisible}
                        value={serieStatus}
                        setValue={setSerieStatus}
                        items={stausList}
                        itemKey="label"
                        placeholder="Select status of serie"
                        style={{ width: '90%', marginBottom: 15, borderRadius: 4, alignSelf: 'center', borderColor: 'gray' }}
                        dropDownContainerStyle={{ width: '90%', borderRadius: 4, alignSelf: 'center' }}
                    />

                    {/* Serie Descripcion */}
                    <TextArea
                        multiline
                        label='Description'
                        value={serieDescription}
                        onChangeText={setSerieDescription}
                    />

                    {/* Add button */}
                    <AddButton
                        disabled={disbaledButton}
                        onPress={editMode ? handleEditSerie : handleSubmitSerie}
                    >
                        <ButtonText>
                            {editMode ? 'Edit Serie' : 'Add Serie'}
                        </ButtonText>
                    </AddButton>

                </FormConatiner>
            </MainContainer>
        </ScrollView>
    )

}

export default AddSeriePage;