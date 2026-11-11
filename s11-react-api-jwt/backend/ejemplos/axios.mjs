import axios from 'axios';

try {
    const response = await axios.get(url);
    console.log(response.data);
} catch (error) {
    console.error("Fallo", error.response?.status ?? error.message);
}