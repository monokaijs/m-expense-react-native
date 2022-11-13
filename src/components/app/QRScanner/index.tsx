import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {
  Barcode,
  BarcodeFormat,
  useScanBarcodes,
} from 'vision-camera-code-scanner';
import StyledText from '@components/common/Text';
import {getSize} from '@utils/ui.utils';
import {paperTheme} from '@configs/theme.config';
import {Button} from 'react-native-paper';

interface QRScannerProps {
  onClose?: () => any;
  onDataChange?: (code: Barcode) => any;
}

export const QRScanner = ({onClose, onDataChange}: QRScannerProps) => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    if (barcodes && barcodes.length !== 0) {
      onDataChange && onDataChange(barcodes[0]);
    }
  }, [barcodes]);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    <View style={styles.outer}>
      {device != null && hasPermission && (
        <>
          <Camera
            style={styles.camera}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
          <View style={styles.descArea}>
            <StyledText style={styles.title}>Scan QR</StyledText>
            <StyledText>
              Scan QR / Barcode to quickly import SKU. Place the QR or Barcode
              inside camera's frame above.
            </StyledText>
            <Button
              mode={'contained'}
              buttonColor={'white'}
              style={styles.cancelBtn}
              onPress={() => onClose && onClose()}>
              Cancel
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  title: {
    fontSize: getSize.m(24),
    fontWeight: '600',
  },
  descArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: getSize.m(16),
    backgroundColor: paperTheme.colors.primary,
    zIndex: 999,
  },
  cancelBtn: {
    marginTop: getSize.m(16),
  },
});
