import React from 'react';
import { Modal, Card, Text, Button } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface CustomAlertProps {
  isOpen: boolean;
  close: () => void;
  buttonText: string;
  message: string;
};

export const CustomAlert = ({ isOpen, close, buttonText, message }: CustomAlertProps) => {
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
              backgroundColor: 'rgba(187, 3, 3, 0.8)',
            }}
          >
            <Text style={styles.buttonsText}>{buttonText}</Text>
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
    justifyContent: 'center',
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
  buttonsText: {
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.5
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});