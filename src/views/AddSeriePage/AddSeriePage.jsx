import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native'
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
import { postUploadSerie } from '../../api/series';


const AddSeriePage = ({ navigation }) => {

    const [serieName, setSerieName] = useState('');
    const [serieAuthor, setSerieAuthor] = useState('');
    const [serieDescription, setSerieDescription] = useState('');
    const [serieStatus, setSerieStatus] = useState('');
    const [cover, setCover] = useState();
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
        
            const data = new FormData();

            data.append('serieName', serieName);
            data.append('serieAuthor', serieAuthor);
            data.append('serieStatus', serieStatus);
            data.append('serieDescription', serieDescription);

            const fileType = cover.uri.substr(cover.uri.lastIndexOf('.') + 1)

            data.append('cover', { uri: cover, name: `${serieName}.${fileType}`, type: `image/${fileType}` })
            
            setLoading(true);
            const response = await postUploadSerie(data);
            setLoading(false);

            console.log(response);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <ScrollView>
            <Loading enabled={loading}/>
            <MainContainer>
                <FormConatiner>
                    {/* Serie Cover */}
                    <AvatarImage
                        marginBottom={20}
                        marginTop={0}
                        src={undefined}
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
                        onPress={handleSubmitSerie}
                    >
                        <ButtonText>
                            Add Serie
                        </ButtonText>
                    </AddButton>

                </FormConatiner>
            </MainContainer>
        </ScrollView>
    )

}

export default AddSeriePage;