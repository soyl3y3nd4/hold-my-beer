import React from 'react';
import { Modal, Card, Text, Button } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface CustomAlertProps {
  isOpen: boolean;
  close: () => void;
  agree: () => void;
  buttonTextConfirm: string;
  buttonTextCancel: string;
  message: string;
};

export const CustomDialog = ({ isOpen, close, agree, buttonTextConfirm, buttonTextCancel, message }: CustomAlertProps) => {
  return (
    <Modal
      visible={isOpen}
      backdropStyle={styles.backdrop}
      onBackdropPress={close}>
      <Card disabled={true} style={styles.container}>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={close}
            style={{
              ...styles.button,
            }}
          >
            <Text style={styles.buttonsText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={agree}
            style={{
              ...styles.button,
              backgroundColor: 'rgba(187, 3, 3, 0.8)',
            }}
          >
            <Text style={styles.buttonsText}>Eliminar</Text>
          </TouchableOpacity>
        </View>

      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    opacity: 0.9,
    elevation: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  message: {
    fontFamily: 'JosefinRegular',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    backgroundColor: 'rgba(255, 175, 0, 0.8)',
    borderRadius: 5,
    height: 40,
    padding: 3,
    width: 100,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonsText: {
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.5
  },
});