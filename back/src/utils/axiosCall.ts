import axios from "axios";

interface ObjectData {
  [key: string]: any;
}

async function call(
  method: string,
  uri: string,
  param: string,
  header: ObjectData = {}
) {
  try {
    return await axios({
      method: method,
      url: uri,
      data: param,
      headers: header,
    });
  } catch (err: any) {
    return err.response;
  }
}

export { call };
