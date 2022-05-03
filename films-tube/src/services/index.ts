import Axios from 'axios';


//Note: In production this token will be obtained in the response body of a login request 
const token = 'Wookie2021';

const service = Axios.create({
   baseURL: 'https://wookie.codesubmit.io',
   headers: {
      Authorization: `Bearer ${token}`,
   }
}); 

export default service;