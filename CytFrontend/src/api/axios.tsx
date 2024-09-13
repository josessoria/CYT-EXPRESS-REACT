import axios from "axios";

const instance = axios.create({
  baseURL: "https://cyt-express-react-a7o9.vercel.app/",
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});

export default instance;
