/*
*   Componente Loading: su proposito es mostrar la actividad de carga, generalmente tras una peticion a la API
*   El componente se sobrepone al contenido de la vista donde se incorpora y se muestra centrado.
*/

import React from 'react';
import { ActivityIndicator, Modal, View, StyleSheet, useColorScheme } from 'react-native';

const Loading = ({ enabled, flat }) => {

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <>
            {enabled && (
                <Modal animationType="fade" transparent={true} visible={enabled} style={{ zIndex: 0 }}>
                    <View style={styles.centeredView}>
                        <View style={flat ? undefined : styles.modalView(isDarkMode)}>
                            <ActivityIndicator animating={enabled} hidesWhenStopped size="large" color="#394E91" />
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalView: (darkMode) => ({
        backgroundColor: darkMode ? "#363333" : "#fff",
        borderWidth: 1,
        borderColor: darkMode ? '#201c1c' : '#eee',
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        width: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    })
});

export default Loading;
