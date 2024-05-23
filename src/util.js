export const CONSTANT = {
    DEFAULT_AUDIO_MOTION_OPTIONS: {
        mode: 10,
        bgAlpha: .7,
        fillAlpha: .6,
        gradient: 'steelblue',
        lineWidth: 2,
        lumiBars: false,
        maxFreq: 16000,
        radial: false,
        reflexAlpha: 1,
        linearAmplitude: true,
        linearBoost: 1.5,
        reflexBright: 1,
        reflexRatio: .5,
        showScaleX: false,
        showBgColor: false,
        roundBars: true,
        showPeaks: false,
        moothing: 0.8,
        overlay: true
    }
}

/**
 * Returns the current date and time formatted as "dd:mm:yyyy hh:mm:ss".
 *
 * @return {string} The formatted date and time.
 */
export function getFormattedDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Jan is 0!
    const yyyy = today.getFullYear();

    const hour = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');

    const formattedDate = `${dd}:${mm}:${yyyy} ${hour}:${minutes}:${seconds}`;
    return formattedDate;
}

/**
 * Converts a given text into a slugified version.
 *
 * @param {string} text - The text to be slugified.
 * @return {string} The slugified version of the input text.
 */
export function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w-]+/g, '')        // Remove all non-word characters
        .replace(/--+/g, '-')           // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

export function convertNewLinesToBR(text) {
    return text.replace(/\n/g, '<br>');
}


/**
 * Retrieves the token from the URL parameters and stores it in the local storage.
 * 
 * TODO: do not store token in local storage
 * 
 * @return {string|null} The stored token, or null if no token is found.
 */
export function getToken() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token !== null) {
            localStorage.setItem('token', token);
        }
        return localStorage.getItem('token');
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
}
