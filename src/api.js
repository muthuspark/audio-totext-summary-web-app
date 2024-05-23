import { getToken } from './util';

export const API = {
  GET_SUMMARIES: "http://localhost:8008/get_summaries",
  GET_SUMMARY: "http://localhost:8008/get_summary",
  REMOVE_SUMMARY: "http://localhost:8008/remove_summary",
  UPDATE_TITLE: "http://localhost:8008/update_title",
  SUMMARIZING_COMPLETED: "http://localhost:8008/summarizing_completed",
  UPLOAD : "http://localhost:8008/upload"
}

class Api {
  constructor() {
    this.authToken = null;
    this.userId = null;
  }

  /**
   * Creates a payload object for a POST request.
   *
   * @param {Object|string} body The body of the request, which can be a stringified JSON or an object.
   * @returns {Object} The payload object containing the method, body, and headers for the POST request.
   */
  async createRequestOptions(body) {

    if(!this.authToken) {
      this.authToken = getToken();
    }

    const options = {
      method: 'POST', // Specify the method as POST
      headers: {
        'Content-Type': 'application/json', // Set the content type header
        Authorization: `Bearer ${this.authToken}` // Add the authorization header
      },
      body: JSON.stringify(body || {}) // Add the JSON data to the body
    };

    // Return the payload object
    return Promise.resolve(options); // Return the options;
  }

  async getSummaries() {
    try {
      const payload = await this.createRequestOptions();
      const response = await fetch(API.GET_SUMMARIES, payload);
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
    const response = await fetch(API.GET_SUMMARY, payload);

    // Check if response status is 404
    if (!response.ok) {
      const data = await response.json();
      // Handle 404 error
      throw new Error(data.message);
    }

    const data = await response.json();
    console.log(data);
    return data;
  }

  async removeSummary(audio_file_name) {
    try {
      const payload = await this.createRequestOptions({
        "audio_file_name": audio_file_name
      });
      const response = await fetch(API.REMOVE_SUMMARY, payload);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async updateRecordingName(recordingName, audioFileName) {
    try {
      const payload = await this.createRequestOptions({
        "audio_file_name": audioFileName,
        "recording_name": recordingName
      });
      const response = await fetch(API.UPDATE_TITLE, payload);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async checkSummarizationStatus(data) {
    try {
      const payload = await this.createRequestOptions(data);
      const response = await fetch(API.SUMMARIZING_COMPLETED, payload);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async fileUpload(formData) {
    return await fetch('/upload', {
        method: 'POST',
        body: formData
    })
  }
}

export default Api;