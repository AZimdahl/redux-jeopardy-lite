//import the axios HTTP client to communicate with the API
import axios from 'axios';

class JeopardyService {
    constructor(url = 'http://jservice.io/api/', client = axios.create()) {
        this.url = url;
        this.client = client;
    }
    getQuestion(categoryId, offsetMax = 0) {
        if (categoryId) {
            return this.client.get(
                this.url + "clues",
                {
                    params: {
                        category: categoryId,
                        offset: this.generateOffset(0, offsetMax)
                    }
                }
            )
        }

        return this.client.get(this.url + "random");
    }

    getCategories(count = 1) {
        return this.client.get(
            this.url + "categories",
            {
                params: {
                    count: count,
                    offset: this.generateOffset(0, 200)
                }
            }
        )
    }

    generateOffset(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

export default JeopardyService;