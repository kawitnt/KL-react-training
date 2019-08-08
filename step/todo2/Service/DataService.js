import axios from 'axios';

class DataService {

    getData() {
        return axios.get('http://172.16.16.62:8080/sql')
        .then((result)=> {
            return result.data;
        })
        .catch((e)=>{
            console.log(e);
        });
    }
}

export default new DataService();