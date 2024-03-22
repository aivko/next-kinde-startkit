interface RequestOptions {
  method: string;
  payload?: any;
  uri: string;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error('Failed to send data to backend');
  }
  return await response.json();
};

const sendRequest = async ({ method, payload, uri }: RequestOptions) => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(uri, options);
    return handleResponse(response);
  } catch (error) {
    console.error('Error sending data to backend:', error);
    throw error;
  }
};

export const createCustomer = async (payload: any) => {
  return sendRequest({
    method: "POST",
    payload,
    uri: "/api/customer"
  });
};

export const updateCustomer = async (payload: any) => {
  return sendRequest({
    method: "PATCH",
    payload,
    uri: "/api/customer"
  });
};

export const fetchCustomer = async () => {
  return sendRequest({
    method: "GET",
    uri: "/api/customer"
  });
};

export const fetchAllCustomer = async () => {
  return sendRequest({
    method: "GET",
    uri: "/api/customer?all"
  });
};

export const removeCustomer = async (id:string) => {
  return sendRequest({
    method: "DELETE",
    uri: "/api/customer",
    payload: id
  });
};
