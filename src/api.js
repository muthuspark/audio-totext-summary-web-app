import { getToken } from './util';


class Api {

  static routes = {
    GET_SUMMARIES: "http://localhost:8008/get_summaries",
    GET_SUMMARY: "http://localhost:8008/get_summary",
    REMOVE_SUMMARY: "http://localhost:8008/remove_summary",
    UPDATE_TITLE: "http://localhost:8008/update_title",
    SUMMARIZING_COMPLETED: "http://localhost:8008/summarizing_completed",
    UPLOAD: "http://localhost:8008/upload"
  }

  constructor() {
    this.authToken = null;
  }

  getHeaders() {
    if (!this.authToken) {
      this.authToken = getToken();
    }


    return {
      'Content-Type': 'application/json', // Set the content type header
      Authorization: `Bearer ${this.authToken}` // Add the authorization header
    }
  }

  /**
   * Creates a payload object for a POST request.
   *
   * @param {Object|string} body The body of the request, which can be a stringified JSON or an object.
   * @returns {Object} The payload object containing the method, body, and headers for the POST request.
   */
  async createRequestOptions(body) {


    const options = {
      method: 'POST', // Specify the method as POST
      headers: this.getHeaders(),
      body: JSON.stringify(body || {}) // Add the JSON data to the body
    };

    // Return the payload object
    return Promise.resolve(options); // Return the options;
  }

  async getSummaries() {
    try {
      const payload = await this.createRequestOptions();
      const response = await fetch(Api.routes.GET_SUMMARIES, payload);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getSummaryById(_id) {
    const payload = await this.createRequestOptions({ "id": _id });
    const response = await fetch(Api.routes.GET_SUMMARY, payload);

    // Check if response status is 404
    if (!response.ok) {
      const data = await response.json();
      // Handle 404 error
      throw new Error(data.message);
    }
    return await response.json();
  }

  async removeSummary(audio_file_name) {
    const payload = await this.createRequestOptions({
      "audio_file_name": audio_file_name
    });
    const response = await fetch(Api.routes.REMOVE_SUMMARY, payload);
    // Check if response status is 404
    if (!response.ok) {
      const data = await response.json();
      // Handle 404 error
      throw new Error(data.message);
    }
    return await response.json();
  }

  async updateRecordingName(recordingName, audioFileName) {
    const payload = await this.createRequestOptions({
      "audio_file_name": audioFileName,
      "recording_name": recordingName
    });
    const response = await fetch(Api.routes.UPDATE_TITLE, payload);
    // Check if response status is 404
    if (!response.ok) {
      const data = await response.json();
      // Handle 404 error
      throw new Error(data.message);
    }
    return await response.json();
  }

  async checkSummarizationStatus(data) {
    const payload = await this.createRequestOptions(data);
    const response = await fetch(Api.routes.SUMMARIZING_COMPLETED, payload);
    // Check if response status is 404
    if (!response.ok) {
      const data = await response.json();
      // Handle 404 error
      throw new Error(data.message);
    }
    return await response.json();
  }

  /**
   * Upload a file to the server using a FormData object
   *
   * @param {FormData} formData - a FormData object containing the file to upload
   * @return {Promise} - a promise that resolves with the response from the server
   */
  async uploadFile(formData) {

    const headers = {
      Authorization: `Bearer ${getToken()}` // Add the authorization header
    }

    const response = await fetch(Api.routes.UPLOAD, {
      method: 'POST',
      body: formData,
      headers: headers
    });

    // Check if response status is 404
    if (!response.ok) {
      const data = await response.json();
      // Handle 404 error
      throw new Error(data.message);
    }
    return await response.json();
  }

  logout() {
    this.authToken = null;
    localStorage.removeItem('token');
  }
}

export default Api;