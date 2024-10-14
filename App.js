import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {firebase} from './Firebase'


export default function App() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

 //Función que permite elegir una imagen de la galería
 const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [3, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  };
  console.log(image);
};

const uploadImage = async () => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function() {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', image, true);
    xhr.send(null);
  })
  const ref = firebase.storage().ref().child(`Pictures/Image1`)
  const snapshot = ref.put(blob)
  snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
    ()=>{
      setUploading(true)
    },
    (error) => {
      setUploading(false)
      console.log(error)
      blob.close()
      return 
    },
    () => {
      snapshot.snapshot.ref.getDownloadURL().then((url) => {
        setUploading(false)
        console.log("Download URL: ", url)
        setImage(url)
        blob.close()
        return url
      })
    }
    )
}

  return (
    <View style={styles.container}>

      <Button title="Seleccionar Imagen" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
       {!uploading ? <Button title='Upload Image' onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    margin:5,
  },
});
