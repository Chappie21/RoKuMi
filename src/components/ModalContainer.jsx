import React, { useCallback } from 'react';
import { View, Modal, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ModalContainer({ visible, onModalClose, title, info }) {

    const closeModal = useCallback(() => {
        onModalClose(null)
    }, [onModalClose])

    return (
        <Modal visible={visible} animationType="slide">
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="close-outline" size={40} color="black" onPress={closeModal} style={{ margin: 10 }} />
                <Text style={{ fontSize: 24 }}>{title}</Text>
            </View>
            <ScrollView
                contentContainerStyle={{ padding: '5%' }}
            >
                <Text style={{textAlign: 'justify'}}>{info}</Text>
            </ScrollView>
        </Modal>
    );
}