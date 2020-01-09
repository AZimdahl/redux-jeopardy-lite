//import the axios HTTP client to communicate with the API
import axios from 'axios';

class JeopardyService {
    constructor(url = 'http://jservice.io/api/random?count=', client = axios.create()){
        this.url = url;
        this.client = client;
    }
    getQuestion(count){
        return this.client.get(this.url + count);
    }
}

export default JeopardyService;