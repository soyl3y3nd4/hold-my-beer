import React from 'react';
import { Modal, Card, Text, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

interface ModalRedirectProps {
  isOpen: boolean;
  close: () => void;
  buttonText: string;
  message: string;
};

export const ModalRedirect = ({ isOpen, close, buttonText, message }: ModalRedirectProps) => {
  return (
    <Modal
      visible={isOpen}
      backdropStyle={styles.backdrop}
      onBackdropPress={close}
    >
      <Card disabled={true} style={styles.container}>
        <Text style={styles.message}>{message}</Text>
        <Button status="control" size="large" appearance="outline" onPress={close} style={styles.button}>
          {buttonText}
        </Button>
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
    backgroundColor: 'rgba(224, 165, 15, 1)',
    borderWidth: 0,
    marginTop: 16,
    width: 140,
    alignSelf: 'center',
  }
});