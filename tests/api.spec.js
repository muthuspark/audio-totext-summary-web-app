import Api from '../src/api'
import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import jest from 'jest-mock'


describe('getSummaries', () => {
    let api;

    beforeEach(() => {
        api = new Api();
    });
    test('should return the response data when the request is successful', async () => {
        const mockResponseData = { data: 'response data' };
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponseData),
        });

        const result = await api.getSummaries();

        expect(result).toEqual(mockResponseData);
        expect(global.fetch).toHaveBeenCalledWith(Api.routes.GET_SUMMARIES, expect.anything());
    });

    test('should throw an error when the request fails', async () => {
        const errorMessage = 'Request failed';
        jest.spyOn(global, 'fetch').mockRejectedValue(new Error(errorMessage));

        await expect(api.getSummaries()).rejects.toThrow(errorMessage);
        expect(global.fetch).toHaveBeenCalledWith(Api.routes.GET_SUMMARIES, expect.anything());
    });

    test('should log the error and rethrow it', async () => {
        const errorMessage = 'Request failed';
        jest.spyOn(global, 'fetch').mockRejectedValue(new Error(errorMessage));
        const consoleErrorSpy = jest.spyOn(console, 'error');

        await expect(api.getSummaries()).rejects.toThrow(errorMessage);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', expect.any(Error));
    });
});

describe('getSummaryById', () => {
    let api;

    beforeEach(() => {
        api = new Api();
    });
    test('should return the summary data when the request is successful', async () => {
        const mockResponseData = { data: 'summary data' };
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponseData),
        });

        const result = await api.getSummaryById('123');

        expect(result).toEqual(mockResponseData);
        expect(global.fetch).toHaveBeenCalledWith(Api.routes.GET_SUMMARY, expect.anything());
    });

    test('should throw an error when the request fails with a 404 status', async () => {
        const errorMessage = 'Summary not found';
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({ message: errorMessage }),
        });

        await expect(api.getSummaryById('123')).rejects.toThrow(errorMessage);
        expect(global.fetch).toHaveBeenCalledWith(Api.routes.GET_SUMMARY, expect.anything());
    });

    test('should log the error and rethrow it when the request fails with a non-404 status', async () => {
        const errorMessage = 'Request failed';
        jest.spyOn(global, 'fetch').mockRejectedValue(new Error(errorMessage));
        const consoleErrorSpy = jest.spyOn(console, 'error');

        await expect(api.getSummaryById('123')).rejects.toThrow(errorMessage);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', expect.any(Error));
    });
});

describe('getSummaryById', () => {
    let api;

    beforeEach(() => {
        api = new Api();
    });

    test('should return the summary data when the request is successful', async () => {
        const mockResponseData = { data: 'summary data' };
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponseData),
        });

        const result = await api.getSummaryById('123');

        expect(result).toEqual(mockResponseData);
        expect(global.fetch).toHaveBeenCalledWith(Api.routes.GET_SUMMARY, expect.anything());
    });

    test('should throw an error when the request fails with a 404 status', async () => {
        const errorMessage = 'Summary not found';
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({ message: errorMessage }),
        });

        await expect(api.getSummaryById('123')).rejects.toThrow(errorMessage);
        expect(global.fetch).toHaveBeenCalledWith(Api.routes.GET_SUMMARY, expect.anything());
    });

    test('should log the error and rethrow it when the request fails with a non-404 status', async () => {
        const errorMessage = 'Request failed';
        jest.spyOn(global, 'fetch').mockRejectedValue(new Error(errorMessage));
        const consoleErrorSpy = jest.spyOn(console, 'error');

        await expect(api.getSummaryById('123')).rejects.toThrow(errorMessage);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', expect.any(Error));
    });
});

describe('removeSummary', () => {
    let api;

    beforeEach(() => {
        api = new Api();
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ data: 'response data' }),
        });
    });

    test('should make a successful request and return the response data', async () => {
        const audioFileName = 'test.mp3';
        const result = await api.removeSummary(audioFileName);

        expect(global.fetch).toHaveBeenCalledWith(Api.routes.REMOVE_SUMMARY, expect.anything());
        expect(result).toEqual({ data: 'response data' });
    });

    test('should throw an error when the request fails with a non-404 status', async () => {
        const audioFileName = 'test.mp3';
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({ message: 'Request failed' }),
        });

        await expect(api.removeSummary(audioFileName)).rejects.toThrow('Request failed');
        expect(global.fetch).toHaveBeenCalledWith(Api.routes.REMOVE_SUMMARY, expect.anything());
    });

    test('should log the error and rethrow it when the request fails', async () => {
        const audioFileName = 'test.mp3';
        jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Request failed'));
        const consoleErrorSpy = jest.spyOn(console, 'error');

        await expect(api.removeSummary(audioFileName)).rejects.toThrow('Request failed');
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', expect.any(Error));
        expect(global.fetch).toHaveBeenCalledWith(Api.routes.REMOVE_SUMMARY, expect.anything());
    });
});

describe('updateRecordingName', () => {
    let api;

    beforeEach(() => {
        api = new Api();
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ data: 'response data' }),
        });
    });

    test('should make a successful request and return the response data', async () => {
        const recordingName = 'test recording';
        const audioFileName = 'test.mp3';
        const result = await api.updateRecordingName(recordingName, audioFileName);

        expect(global.fetch).toHaveBeenCalledWith(Api.routes.UPDATE_TITLE, expect.anything());
        expect(result).toEqual({ data: 'response data' });
    });

    test('should throw an error when the request fails with a non-404 status', async () => {
        const recordingName = 'test recording';
        const audioFileName = 'test.mp3';
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({ message: 'Request failed' }),
        });

        await expect(api.updateRecordingName(recordingName, audioFileName)).rejects.toThrow('Request failed');
        expect(global.fetch).toHaveBeenCalledWith(Api.routes.UPDATE_TITLE, expect.anything());
    });

    test('should log the error and rethrow it when the request fails with a 404 status', async () => {
        const recordingName = 'test recording';
        const audioFileName = 'test.mp3';
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: false,
            status: 404,
            json: jest.fn().mockResolvedValue({ message: 'Not found' }),
        });
        const consoleErrorSpy = jest.spyOn(console, 'error');

        await expect(api.updateRecordingName(recordingName, audioFileName)).rejects.toThrow('Not found');
        expect(global.fetch).toHaveBeenCalledWith(Api.routes.UPDATE_TITLE, expect.anything());
    });
});

describe('checkSummarizationStatus', () => {
    let api;

    beforeEach(() => {
        api = new Api();
    });

    test('should return the response when the request is successful', async () => {
        const mockResponseData = { data: 'response data' };
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponseData),
        });

        const result = await api.checkSummarizationStatus({});

        expect(result).toEqual(mockResponseData);
        expect(global.fetch).toHaveBeenCalledWith(Api.routes.SUMMARIZING_COMPLETED, expect.anything());
    });

    test('should throw an error when the request fails', async () => {
        const errorMessage = 'Request failed';
        jest.spyOn(global, 'fetch').mockRejectedValue(new Error(errorMessage));

        await expect(api.checkSummarizationStatus({})).rejects.toThrow(errorMessage);
        expect(global.fetch).toHaveBeenCalledWith(Api.routes.SUMMARIZING_COMPLETED, expect.anything());
    });

    test('should throw an error when the response status is 404', async () => {
        const errorMessage = 'Not found';
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: false,
            status: 404,
            json: jest.fn().mockResolvedValue({ message: errorMessage }),
        });

        await expect(api.checkSummarizationStatus({})).rejects.toThrow(errorMessage);
        expect(global.fetch).toHaveBeenCalledWith(Api.routes.SUMMARIZING_COMPLETED, expect.anything());
    });
});

describe('uploadFile', () => {
    let api;
    let fetchMock;

    beforeEach(() => {
        api = new Api();
        fetchMock = jest.fn();
        global.fetch = fetchMock;
    });

    test('should send the provided formData in the request body', async () => {

        const mockResponseData = { data: 'response data' };
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponseData),
        });


        const formData = new FormData();
        formData.append('file', new Blob(['file content']));

        const result = await api.uploadFile(formData);
        expect(result).toEqual(mockResponseData);

        expect(global.fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
            body: formData,
        }));
    });

    test('should resolve with the response from the server', async () => {
        const formData = new FormData();
        formData.append('file', new Blob(['file content']));
        const response = new Response('{"message": "File uploaded successfully"}', {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
        fetchMock.mockResolvedValue(response);

        const result = await api.uploadFile(formData);

        expect(result).toEqual({ message: 'File uploaded successfully' });
    });

    test('should throw an error when the request fails with a non-2xx status code', async () => {
        const formData = new FormData();
        formData.append('file', new Blob(['file content']));
        const response = new Response('{"message": "File upload failed"}', {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
        fetchMock.mockResolvedValue(response);

        await expect(api.uploadFile(formData)).rejects.toThrow('File upload failed');
    });

    test('should log the error and rethrow it when the request fails with a 404 status', async () => {
        const formData = new FormData();
        formData.append('file', new Blob(['file content']));
        fetchMock.mockResolvedValue({
            ok: false,
            status: 404,
            json: jest.fn().mockResolvedValue({ message: 'Not found' }),
        });
        const consoleErrorSpy = jest.spyOn(console, 'error');

        await expect(api.uploadFile(formData)).rejects.toThrow('Not found');
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', expect.any(Error));
    });

    test('should log the error and rethrow it when the request fails', async () => {
        const formData = new FormData();
        formData.append('file', new Blob(['file content']));
        fetchMock.mockRejectedValue(new Error('Request failed'));
        const consoleErrorSpy = jest.spyOn(console, 'error');

        await expect(api.uploadFile(formData)).rejects.toThrow('Request failed');
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', expect.any(Error));
    });
});