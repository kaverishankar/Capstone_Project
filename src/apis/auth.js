import instance from "../store/api-instance";

const handledAPIPost = async (path,payload) => {
  try {
    const response = await instance.post(path, payload);

    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

const handledAPIGet = async (path) => {
  try {
    const response = await instance.get(path);

    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

const handledAPIPut = async (path, data) => {
  try {
    const response = await instance.put(path, data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

const handledAPIDelete = async (path) => {
  try {
    const response = await instance.delete(path);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export { handledAPIGet, handledAPIPost , handledAPIPut , handledAPIDelete};