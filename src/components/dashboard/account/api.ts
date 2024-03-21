import { apiUrl } from './constants';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error('Failed to send data to backend');
  }
  return await response.json();
};

const sendRequest = async (method: string, payload?: any) => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(apiUrl, options);
    return handleResponse(response);
  } catch (error) {
    console.error('Error sending data to backend:', error);
    throw error;
  }
};

export const createAdmin = async (payload: any) => {
  return sendRequest('POST', payload);
};

export const updateAdmin = async (payload: any) => {
  return sendRequest('PATCH', payload);
};

export const fetchAdmin = async () => {
  return sendRequest('GET');
};
