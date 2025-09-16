import { dispatchCustomEvent } from '../dom';
import { CUSTOM_EVENTS, OS_TYPES } from '../utils/constants';

/**
 * This method can be used to get the OS Name.
 *
 * @remarks
 * This method depends on userAgent sniffing and therefore susciptible to spoofing. Avoid detecting browsers in business impacting code
 *
 * @example
 * ```
 * console.log('Browser Name - ',getOSName());
 * ```
 */
export function getOSName() {
  try {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      throw new Error('window or navigator is undefined');
    }

    const userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = [ 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K' ],
      windowsPlatforms = [ 'Win32', 'Win64', 'Windows', 'WinCE' ],
      iosPlatforms = [ 'iPhone', 'iPad', 'iPod' ];

    let os = '';

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = OS_TYPES.MAC_OS;

    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = OS_TYPES.IOS;

    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = OS_TYPES.WINDOWS;

    } else if (/Android/i.test(userAgent)) {
      os = OS_TYPES.ANDROID;

    } else if (!os && /Linux/.test(platform)) {
      os = OS_TYPES.LINUX;
    }

    return os;

  } catch (e) {

    dispatchCustomEvent(CUSTOM_EVENTS.TRACK_LOG, {
      function: 'getOSName',
      error: e
    });

    console.error(`Error with getOSName ${e}`);
  }

  return '';
}


/**
 * Extracts the operating system version from the browser's user agent string.
 *
 * @remarks
 * This function parses the user agent to determine the OS version for Windows, macOS, Linux, iOS, and Android.
 * Returns an empty string if the OS version cannot be determined or if not running in a browser environment.
 *
 * @returns {string} The OS version as a string, or an empty string if not detected.
 *
 * @example
 * ```
 * const osVersion = getOSVersion();
 * console.log('OS Version:', osVersion);
 * ```
 */
export function getOSVersion(): string {
  if (typeof window === 'undefined' || !navigator?.userAgent) {
    return '';
  }

  const userAgent = navigator.userAgent;

  // Windows
  if (userAgent.includes('Windows NT')) {
    const match = userAgent.match(/Windows NT (\d+\.\d+)/);

    return match ? match[1] : '';
  }

  // macOS
  if (userAgent.includes('Mac OS X')) {
    const match = userAgent.match(/Mac OS X (\d+[._]\d+[._]?\d*)/);

    return match ? match[1].replace(/_/g, '.') : '';
  }

  // Linux
  if (userAgent.includes('Linux')) {
    return 'Linux';
  }

  // Mobile devices
  if (userAgent.includes('iPhone OS')) {
    const match = userAgent.match(/iPhone OS (\d+[._]\d+[._]?\d*)/);

    return match ? match[1].replace(/_/g, '.') : '';
  }

  if (userAgent.includes('Android')) {
    const match = userAgent.match(/Android (\d+\.\d+\.?\d*)/);

    return match ? match[1] : '';
  }

  return '';
}


/**
 * @deprecated since version 0.2.0
 * This method can be used to get the browser name.
 *
 * @remarks
 * This method depends on userAgent sniffing and therefore susciptible to spoofing. Avoid detecting browsers in business impacting code
 *
 * @example
 * ```
 * console.log('Browser Name - ',getBrowserName());
 * ```
 */
export function getBrowserName(): string {
  try {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      throw new Error('window or navigator is undefined');
    }

    if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
      return 'Opera';

    } else if (navigator.userAgent.indexOf('Edg') !== -1) {
      return 'Edge';

    } else if (navigator.userAgent.indexOf('Chrome') !== -1) {
      return 'Chrome';

    } else if (navigator.userAgent.indexOf('Safari') !== -1) {
      return 'Safari';

    } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
      return 'Firefox';

      // Double exclaimation is used to cast a value to boolean
    } else if ((navigator.userAgent.indexOf('MSIE') !== -1) || (!!document.DOCUMENT_NODE)) { //IF IE > 10
      return 'IE';

    } else {
      return 'unknown';
    }

  } catch (err) {
    console.error(`Error with getBrowserName ${err}`);

    dispatchCustomEvent(CUSTOM_EVENTS.TRACK_LOG, {
      function: 'getBrowserName',
      error: err
    });
  }

  return '';
}


/**
 * This method can be used to get the browser name & version.
 *
 * @remarks
 * This method depends on userAgent sniffing and therefore susciptible to spoofing. Avoid detecting browsers in business impacting code
 *
 * @example
 * ```
 * console.log('Browser Name - ',getBrowserName());
 * ```
 */
export function getBrowserVersion() {

  try {
    const userAgent = navigator.userAgent;
    let match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    let browserObjMatch = [];

    if (/trident/i.test(match[1])) {
      browserObjMatch = /\brv[ :]+(\d+)/g.exec(userAgent) || [];

      return { name: 'IE', version: (browserObjMatch[1] || '') };
    }

    if (match[1] === 'Chrome') {
      browserObjMatch = userAgent.match(/\bOPR|Edge\/(\d+)/) ?? [];

      if (browserObjMatch.length) { return { name: 'Opera', version: browserObjMatch[1] }; }
    }

    match = match[2] ? [ match[1], match[2] ] : [ navigator.appName, navigator.appVersion, '-?' ];

    browserObjMatch = userAgent.match(/version\/(\d+)/i) ?? [];
    if (browserObjMatch.length) { match.splice(1, 1, browserObjMatch[1]); }

    return {
      name: match[0],
      version: match[1]
    };

  } catch (err) {
    console.error(`Error with getBrowserName ${err}`);

    dispatchCustomEvent(CUSTOM_EVENTS.TRACK_LOG, {
      function: 'getBrowserName',
      error: err
    });
    return {
      name: null,
      version: null
    };
  }
}


/**
 * Extracts device manufacturer and model information from the browser's user agent string.
 *
 * @remarks
 * This function attempts to determine the device manufacturer and model for mobile devices (Samsung, Apple, Android) and returns browser name and 'Desktop' for desktop browsers.
 * Returns empty strings if not running in a browser environment or if information cannot be determined.
 *
 * @returns {{ manufacturer: string; model: string }} An object containing the manufacturer and model of the device.
 *
 * @example
 * ```
 * const deviceInfo = getDeviceModelInfo();
 * console.log('Manufacturer:', deviceInfo.manufacturer, 'Model:', deviceInfo.model);
 * ```
 */
export function getDeviceModelInfo(): { manufacturer: string; model: string } {
  if (typeof window === 'undefined' || !navigator?.userAgent) {
    return { manufacturer: '', model: '' };
  }

  const userAgent = navigator.userAgent;
  const browserName = getBrowserName();

  // For web browsers, we can use browser name as manufacturer
  // and try to extract more specific model information
  let manufacturer = browserName || '';
  let model = '';

  // Try to extract more specific device info for mobile devices
  if (userAgent.includes('Mobile') || userAgent.includes('Android')) {
    if (userAgent.includes('Samsung')) {
      manufacturer = 'Samsung';
      const samsungMatch = userAgent.match(/SM-[A-Z0-9]+/);

      model = samsungMatch ? samsungMatch[0] : 'Mobile';

    } else if (userAgent.includes('iPhone')) {
      manufacturer = 'Apple';
      model = 'iPhone';

    } else if (userAgent.includes('iPad')) {
      manufacturer = 'Apple';
      model = 'iPad';

    } else if (userAgent.includes('Android')) {
      manufacturer = 'Android';
      model = 'Mobile';
    }

  } else {
    // For desktop browsers, use the browser name
    model = 'Desktop';
  }

  return { manufacturer, model };
}


/**
 * Determines the network connection type of the user's device using the Network Information API if available.
 *
 * @remarks
 * This function attempts to use the Network Information API to get the effective network type (e.g., 'wifi', '4g', '3g').
 * If the API is not available, it falls back to checking the online/offline status and returns 'wifi' or 'offline'.
 * Returns an empty string if not running in a browser environment.
 *
 * @returns {string} The network type (e.g., 'wifi', '4g', 'offline'), or an empty string if not detected.
 *
 * @example
 * ```
 * const networkType = getNetworkType();
 * console.log('Network Type:', networkType);
 * ```
 */
export function getNetworkType(): string {
  if (typeof window === 'undefined' || !navigator) {
    return '';
  }

  // Check if navigator.connection is available (Network Information API)
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  if (connection) {
    return connection.effectiveType || connection.type || '';
  }

  // Fallback to online/offline status
  return navigator.onLine ? 'wifi' : 'offline';
}


/**
 * Collects and returns basic device context data such as manufacturer, model, OS, and network type.
 *
 * @remarks
 * This function aggregates device and environment information using helper functions. Some fields (like carrier and sdkVersion) are not available in the browser context and are returned as empty strings.
 *
 * @returns {object} An object containing device and environment context data.
 *
 * @example
 * ```
 * const context = getBasicDeviceContextData();
 * console.log(context);
 * ```
 */
export function getBasicDeviceContextData() {
  const deviceModelInfo = getDeviceModelInfo();

  return {
    appVersionCode: 0,
    carrier: '', // Not available in browser context
    manufacturer: deviceModelInfo.manufacturer,
    model: deviceModelInfo.model,
    networkType: getNetworkType(),
    osName: getOSName() ?? '',
    osVersion: getOSVersion(),
    sdkVersion: ''
  };
}
