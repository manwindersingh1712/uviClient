import axios from "axios";
import { ENV_VARS } from "./enums";

const { API } = ENV_VARS;

export const getTasks = async () => {
  try {
    const responseData = await axios.get(`${API}/task/get`);
    let data = responseData.data.tasks;
    return data;
  } catch (err) {
    console.log(err);
  }
};
