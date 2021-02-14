import axios from "axios";

const STRATZ_ENDPOINT = "https://api.stratz.com/api/v1/";

export const fetchStratz = async (path) => {
  console.log(`${STRATZ_ENDPOINT}${path}`);
  const res = await axios
    .get(`${STRATZ_ENDPOINT}${path}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.warn(error);
      return error;
    });
  return res;
};
