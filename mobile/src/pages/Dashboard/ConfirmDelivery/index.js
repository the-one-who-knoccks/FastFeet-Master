import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  ConfirmContainer,
  CameraContainer,
  StyledTouchableOpacity,
  PendingView,
  CameraView,
  ChangePicture,
  PreviewPicture,
  StyledRNCamera,
  SendButton,
  SendText,
  ChangePictureIcon,
} from './styles';

import api from '~/services/api';

export default function ConfirmDelivery({ route, navigation }) {
  const { order } = route.params;

  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState(false);
  const deliveryman = useSelector(state => state.auth);

  const takePicture = async camera => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      setPicture(data.uri);
    }
  };

  async function finishDelivery() {
    setLoading(true);
    try {
      const data = new FormData();

      data.append('file', {
        type: 'image/jpeg',
        uri:
          Platform.OS === 'android' ? picture : picture.replace('file://', ''),
        name: picture.split('/')[9],
      });

      const response = await api.post('files', data);

      await api.put(`deliveryman/${deliveryman.id}/order/${order.id}`, {
        end_date: new Date(),
        signature_id: response.data.id,
      });

      navigation.popToTop();

      Alert.alert('Entrega finalizada com sucesso!');
    } catch (error) {
      console.tron.warn(`Erro = ${error}`);
    }

    setLoading(false);
  }

  return (
    <Container>
      <ConfirmContainer>
        <CameraContainer>
          {!picture ? (
            <StyledRNCamera
              captureAudio={false}
              type={StyledRNCamera.Constants.Type.back}
              flashMode={StyledRNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            >
              {({ camera, status }) => {
                if (status !== 'READY')
                  return (
                    <PendingView>
                      <Text>Waiting</Text>
                    </PendingView>
                  );
                return (
                  <CameraView>
                    <StyledTouchableOpacity onPress={() => takePicture(camera)}>
                      <Icon
                        name="photo-camera"
                        size={35}
                        color="rgba(255,255,255,0.3)"
                      />
                    </StyledTouchableOpacity>
                  </CameraView>
                );
              }}
            </StyledRNCamera>
          ) : (
            <>
              <ChangePicture onPress={() => setPicture(null)}>
                <ChangePictureIcon>
                  <Icon
                    name="photo-camera"
                    size={35}
                    color="rgba(255,255,255,0.6)"
                  />
                </ChangePictureIcon>
                <PreviewPicture source={{ uri: picture }} />
              </ChangePicture>
              <SendButton onPress={finishDelivery}>
                <SendText>Finalizar Entrega</SendText>
              </SendButton>
            </>
          )}
        </CameraContainer>
      </ConfirmContainer>
    </Container>
  );
}

ConfirmDelivery.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
