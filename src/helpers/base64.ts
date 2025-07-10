export const objectToBase64 = (obj: any): string | null => {
  try {
    const jsonString = JSON.stringify(obj);
    return btoa(unescape(encodeURIComponent(jsonString)));
  } catch (error) {
    console.error('Error encoding to base64:', error);
    return null;
  }
};

export const base64ToObject = (base64: string): any | null => {
  try {
    const jsonString = decodeURIComponent(escape(atob(base64)));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decoding from base64:', error);
    return null;
  }
};
