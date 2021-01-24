
const prod = {
    url: {
        API_URL: '<prod-url>'
    }
};

const dev = {
    url: {
        API_URL: 'https://localhost:5000'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;