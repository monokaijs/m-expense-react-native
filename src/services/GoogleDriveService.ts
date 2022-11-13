import {
  GDrive,
  MimeTypes,
} from '@robinbobin/react-native-google-drive-api-wrapper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export class GoogleDriveService {
  static async uploadFile(fileName: string, contentString: string) {
    const driveHandler = new GDrive();
    driveHandler.accessToken = (await GoogleSignin.getTokens()).accessToken;
    const Buffer = require('buffer').Buffer;
    return await driveHandler.files
      .newMultipartUploader()
      .setData(new Buffer(contentString).toString('base64'), MimeTypes.TEXT)
      .setIsBase64(true)
      .setRequestBody({
        name: fileName,
      })
      .execute();
  }
}
