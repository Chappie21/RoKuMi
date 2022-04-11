import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const AvatarImage = ({
  size,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  setImage,
}) => {

  const [selectImage, setSelectedImage] = useState();

  useEffect(() =>{

  }, [selectImage])


  const SelectOrPickImagePorifleDisplay = () => {
    Alert.alert("Select option", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Pick Image on Gallery",
        onPress: async () => await PickImage_andUpdate(),
      },
    ]);
  };

  const PickImage_andUpdate = async () => {
    // Activar galeria para elegir una foto
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    // En caso de no cancelar, actualizar foto en la vista y actualizar perfil en la API
    if (!result.cancelled) {
      UpdatePcik(result);
    }
  };

  // Actualizar Foto de perfil en la vista y la API
  const UpdatePcik = async (newPick) => {
    setImage(newPick);
    setSelectedImage(newPick);
  };

  return (
    <View style={{ position: "relative" }}>
      {setImage && (
        <TouchableOpacity
          style={{
            position: "absolute",
            zIndex: 999,
            top: 15,
            right: 0,
            borderRadius: 100,
            padding: 5,
            backgroundColor: '#ab47bc',
            borderColor: "white",
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={SelectOrPickImagePorifleDisplay}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              resizeMode: "contain",
              tintColor: "white",
            }}
            source={require("../../assets/edit.png")}
          />
        </TouchableOpacity>
      )}
      <Image
        style={{
          width: size ? size : 150,
          height: size ? size : 150,
          borderRadius: 100,
          marginTop: marginTop ? marginTop : 0,
          marginRight: marginRight ? marginRight : 0,
          marginBottom: marginBottom ? marginBottom : 0,
          marginLeft: marginLeft ? marginLeft : 0,
        }}
        source={
          selectImage ? selectImage  : require("../../assets/RuKoMiLogo.png")
        }
      ></Image>
    </View>
  );
};

export default AvatarImage;
