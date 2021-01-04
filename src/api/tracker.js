import axios from 'axios';
import AsyncStorage  from '@react-native-async-storage/async-storage';


const instance = axios.create({
  baseURL: 'http://96cf0940fe2e.ngrok.io'
});


//allows us to auth before making requests to back end
instance.interceptors.request.use(
  //first function is called upon the request, second is called if there is an error
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`here is the token ${token}`);
    }
    return config;
  },
  (err) => {
    console.log('here is an error');
    return Promise.reject(err);
  }
);

export default instance;