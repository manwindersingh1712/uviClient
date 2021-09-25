import axios from "axios";

export const getTasks = async () => {
  try {
    const responseData = await axios.get("http://localhost:4000/task/get");
    let data = responseData.data.tasks;
    return data;
  } catch (err) {
    console.log(err);
  }
};
