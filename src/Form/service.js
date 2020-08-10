const BASE_URL = 'http://httpbin.org/';

const getRange = async (min, max) => {
  const url = new URL('get', BASE_URL);
  url.search = new URLSearchParams({ min, max });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
};

export default getRange;
