import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-builder-412f5.firebaseio.com/",
});

export default instance;
