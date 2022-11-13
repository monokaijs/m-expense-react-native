import axios from 'axios';
// @ts-ignore
import qs from 'qs';
import {MAP_API_KEY} from '@configs/app.config';

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

  static async getLocationCoordinate(address: string) {
    const {data} = await axios({
      method: 'GET',
      url: 'https://maps.google.com/maps/api/geocode/json',
      params: {
        address: address,
        key: MAP_API_KEY,
      },
    });
    console.log('location data', data);
    return data;
  }
}
