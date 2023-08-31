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

  /**
   * @param {*} id
   * @returns
   *
   * fungsi ini berfungsi untuk memangil source code per satu element
   * dengan menggunakan code thumbnail
   */
  static async getComponentCode(id) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/component/code/${id}`
      );
      const responseData = response.data;

      if (responseData.status === "success") {
        return responseData.code;
      }

      // If data is empty
      return null;
    } catch (error) {
      console.log(error);
      return null; // Handle the error case
    }
  }

  /**
   * fungsi ini digunakan untuk mengambil header template html saat pertama kali component diklik
   * jika bukan pertama kali. maka ini tidak perlu dipanggil lagi
   */
  static async getHeaderTemplate() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/component/template/header-code`
      );
      const responseData = response.data;

      if (responseData.status === "success") {
        return responseData.code;
      }

      // If data is empty
      return null;
    } catch (error) {
      console.log(error);
      return null; // Handle the error case
    }
  }
}
