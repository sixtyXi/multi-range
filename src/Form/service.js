const BASE_URL = 'http://httpbin.org/';

const getRange = async (min, max) => {
  const url = new URL('get', BASE_URL);
  url.search = new URLSearchParams({ min, max });

  const response = await fetch(url);
  const message = response.statusText || `Status: ${response.status}`;

  if (!response.ok) {
    throw new Error(message);
  }

  return message;
};

export default getRange;
