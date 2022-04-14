import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native'
// import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';
import { NoContent } from '../../components/NoContent/NoContent'

const ImageBrowserPage = ({ navigation, route }) => {

    const imagesCallback = (callback) => {

        navigation.setOptions({
            headerRight: () => <ActivityIndicator size='small' color={'#0580FF'} />
        });

        callback.then(async (photos) => {
            const cPhotos = [];
            for (let photo of photos) {
                // const pPhoto = await processImageAsync(photo.uri);
                cPhotos.push({
                    uri: photo.uri,
                    name: photo.filename,
                    width: photo.width,
                    height: photo.height,
                    type: `image/${photo.uri.substr(photo.uri.lastIndexOf('.') + 1)}`
                })
            }
            navigation.navigate('AddChapterPage', { pages: cPhotos });
        })
            .catch((e) => console.log(e));
    };

    /*const processImageAsync = async (uri)  => {
        const file = await ImageManipulator.manipulateAsync(
          uri,
          [{resize: { width: 1000 }}],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        return file;
    };*/

    // Actualizar cabecera con boton DOone en caso de seleccionar alguna imagen
    const updateHandler = (count, onSubmit) => {
        navigation.setOptions({
            title: `Selected ${count} files`,
            headerRight: () => renderButton(count, onSubmit)
        });
    };

    const renderButton = (count, onSubmit) => {
        if (!count) { return null; }

        return (
            <TouchableOpacity title={'Done'} onPress={onSubmit}>
                <Text onPress={onSubmit}>Done</Text>
            </TouchableOpacity>
        )
    }

    const renderSelectedComponent = (number) => (
        <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{number}</Text>
        </View>
    );

    return (

        <ImageBrowser
            onChange={updateHandler}
            callback={imagesCallback}
            renderSelectedComponent={renderSelectedComponent}
            emptyStayComponent={() => <NoContent message="No images here" />}
        />

    )
}

const styles = StyleSheet.create({
    countBadge: {
        paddingHorizontal: 8.6,
        paddingVertical: 5,
        borderRadius: 50,
        position: 'absolute',
        right: 3,
        bottom: 3,
        justifyContent: 'center',
        backgroundColor: '#0580FF'
    },
    countBadgeText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 'auto',
        color: '#ffffff'
    }
});

export default ImageBrowserPage;