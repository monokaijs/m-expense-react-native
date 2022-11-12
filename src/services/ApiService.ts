import axios from 'axios';
// @ts-ignore
import qs from 'qs';

export class ApiService {
  static async saveTrips(userId: string, trips: Trip[]) {
    const {data} = await axios({
      method: 'POST',
      url: 'http://cwservice1786.herokuapp.com/sendPayLoad',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        jsonpayload: JSON.stringify({
          userId,
          detailList: trips,
        }),
      }),
    });
    return data;
  }
}
