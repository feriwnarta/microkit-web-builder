import axios from "axios";

export default function LivePreview(html) {
  const postData = async () => {
    try {
      const formData = new FormData();
      formData.append("content", html);

      const response = await axios.post("http://127.0.0.1:8000/live-preview", formData);

      console.log(response.data.body);

      window.open(response.data.body);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  postData();
}
