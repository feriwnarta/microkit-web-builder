import axios from "axios";

export default class AccordionService {
  static async getComponentPopOver(id) {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/component/${id}`);
      const responseData = response.data;

      if (responseData.status === "success") {
        return responseData.element;
      }

      // If data is empty
      return null;
    } catch (error) {
      console.log(error);
      return null; // Handle the error case
    }
  }
}
