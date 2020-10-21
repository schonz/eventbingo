
const prod = {
    url: {
        API_URL: 'http://54.88.11.240:5000'
    }
};

const dev = {
    url: {
        API_URL: 'http://localhost:5000'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;