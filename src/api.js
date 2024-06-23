import axios from 'axios';

const API_URL = '/api/reliability';

async function checkSourceReliability(newsUrl) {
  try {
    const response = await axios.post(API_URL, { news_url: newsUrl });
    console.log('API response:', response.data); // Log the response data
    return response.data; // Assuming response.data contains { source_reliability, citations }
  } catch (error) {
    console.error('Error checking source reliability:', error.response || error.message || error);
    throw error;
  }
}

export { checkSourceReliability };
