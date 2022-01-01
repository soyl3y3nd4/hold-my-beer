import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';

const width = Dimensions.get('window').width;

interface Props {
  isOpen: boolean;
  close: () => void;
  takePhoto: () => void;
  takePhotoFromLibrary: () => void;
};

export const ModalMediaZone = ({
  isOpen,
  close,
  takePhoto,
  takePhotoFromLibrary,
}: Props) => {
  return (
    <Modal
      visible={isOpen}
      backdropStyle={styles.backdrop}
      onBackdropPress={close}>
      <Card disabled={true} style={styles.container}>
        <Text style={styles.message}>Añadir una imagen</Text>
        <TouchableOpacity
          onPress={takePhoto}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Tomar una foto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={takePhotoFromLibrary}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Seleccionar una imagen</Text>
        </TouchableOpacity>

      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    opacity: 0.9,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.8,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  message: {
    fontFamily: 'JosefinRegular',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
  },
  button: {
    backgroundColor: 'rgba(224, 165, 15, 1)',
    borderRadius: 5,
    borderWidth: 0,
    marginTop: 16,
    width: 240,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'JosefinBold',
    color: 'white',
  }
});
