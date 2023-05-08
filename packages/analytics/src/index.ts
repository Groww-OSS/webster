import { getDeviceDetails } from '@groww-tech/ella';
import { DeviceDetailsPayload } from './types';
import { USER_ATTRIBUTES, MAX_COUNT_CHECK } from './constants';

const browserDetailsObject = getDeviceDetails() as DeviceDetailsPayload;
let countWebengageLoad = 1;
let countGtmLoad = 1;

declare global {
  interface Window { 
    webengage: any;
    dataLayer: any;
  }
}


/**
 * This function will send event to webengage and gtm as of now but any new analytics tool if integrated once added here will send event to that tool also
 *
 * @param category This is used to identify the category of the event
 * @param eventName The name of the event that needs to be sent to either webengage or gtm
 * @param properties Additional properties that need to be sent for analytics
 *
 * @returns void
 *
 * @example
 *  ```
 *  const eventProperties = {
 *    userName: 'John Doe'
 *  }
 *
 *  trackEvent('Dev', 'PageView');
 *  trackEvent('Dev', 'PageView', eventProperties);     //If you need to send any custom event properties
 *
 *  ```
 */
export function trackEvent(category: string, eventName: string, properties = {}) {
  // sending event to browsing history and webengage and gtm
  try {
    const updatedProperties = {
      ...properties,
      origin: browserDetailsObject.origin
    };

    // sending event to webengage
    sendEventToWebengage(eventName, updatedProperties);

    // sending event to gtm
    sendEventToGtm(eventName, updatedProperties, category);

  } catch (e) {
    console.error('Exception trackEvent', e);
  }
}


/**
 * This function is sending event to webengage
 *
 * @param eventName The name of the event that needs to be sent to webengage
 * @param properties Additional properties that need to be sent for analytics
 *
 *
 * @internal
 *
 */
function sendEventToWebengage(eventName: string, properties: object) {
  if (isWebengageDefined()) {
    //This is the webengage API to send event name and properties
    window.webengage.track(eventName, properties);

  } else {
    //This block will keep calling itself after every 1sec till webengage doesn't get loaded
    if (countWebengageLoad <= MAX_COUNT_CHECK) {
      countWebengageLoad++;
      setTimeout(() => sendEventToWebengage(eventName, properties), 1000);
    }
  }
}


/**
 * This function is sending event to GTM
 *
 * @param eventName The name of the event that needs to be send to gtm
 * @param properties The name of the event that needs to be sent to gtm
 * @param category This is used to identify the category of the event
 *
 *
 * @internal
 *
 */
function sendEventToGtm(eventName: string, properties: object, category: string) {
  if (isGtmDefined()) {
    // Pushing these events to datalayer
    window.dataLayer.push({
      event: 'event',
      eventCategory: category,
      eventAction: eventName,
      eventLabel: JSON.stringify(properties)
    });

  } else {
    //This block will keep calling itself after every 1sec till gtm doesn't get loaded
    if (countGtmLoad <= MAX_COUNT_CHECK) {
      countGtmLoad++;
      setTimeout(() => sendEventToGtm(eventName, properties, category), 1000);
    }
  }

}


/**
 * This function helps in identifying the attributes, events nd session info accumulated that are created associated to an anonymous user that is created by default. Once logged in all of this stored information is attributed to this identified user
 *
 *
 * @param name This is used to identify the name of the logged in user
 * @param emailId This is the emailId which tells the emailId of the logged in user
 * @param thirdPartyId This is the unique id which we send which maps it to a specific user
 * @param phoneNumber This is the phone number of the user
 *
 * @returns void
 *
 *
 * @example
 * ```
 * identifyLoggedInUser('John Doe', 'johndoe@gmail.com', 'test123', '9876543210')
 * ```
 */
export function identifyLoggedInUser(name: string, emailId: string, thirdPartyId = '', phoneNumber = '') {
  identifyWebengageLoggedInUser(name, emailId, thirdPartyId, phoneNumber);
}


/**
 *
 * @param name This is used to identify the name of the logged in user
 * @param emailId This is the emailId which tells the emailId of the logged in user
 * @param thirdPartyId This is the unique id which we send which maps it to a specific user
 * @param phoneNumber This is the phone number of the user
 *
 * @returns void
 *
 * @internal
 */
function identifyWebengageLoggedInUser(name: string, emailId: string, thirdPartyId = '', phoneNumber = '') {
  if (isWebengageDefined()) {
    if (window.webengage.user) {

      //By calling the webengage's login method all of this stored information is attributed to this identified user.
      window.webengage.user.login(thirdPartyId);

      updateAttributeInWebengage(USER_ATTRIBUTES.FirstName, name);
      updateAttributeInWebengage(USER_ATTRIBUTES.UserEmail, emailId);
      updateAttributeInWebengage(USER_ATTRIBUTES.PhoneNumber, phoneNumber);
    }

  } else {
    if (countWebengageLoad <= MAX_COUNT_CHECK) {
      countWebengageLoad++;
      setTimeout(() => identifyLoggedInUser(name, emailId, thirdPartyId, phoneNumber), 1000);
    }
  }
}


/**
 * This function provides setters for assigning values against each attribute for the users. These attributes can be used to segment users, configure campaign targeting and personalize messages sent through each channel of engagement.
 *
 *
 * @param attribute This is the string which sets the attribute that you want to set
 * @param value This is the string which sets the value against the attribute that you want to set
 *
 * @returns void
 *
 * @example
 * ```
 * updateUserAttribute('first_name', 'John Doe');
 * ```
 */
export function updateUserAttribute(attribute: string, value: string) {
  updateAttributeInWebengage(attribute, value);
}


/**
 *
 * @param attribute This is the string which sets the attribute that you want to set
 * @param value This is the string which sets the value against the attribute that you want to set
 *
 * @internal
 *
 */
function updateAttributeInWebengage(attribute: string, value: string) {
  if (isWebengageDefined()) {
    if (window.webengage.user) {
      //webengage provides a setter for assigning values against each attribute for the users
      window.webengage.user.setAttribute(attribute, value);
    }

  } else {
    if (countWebengageLoad <= MAX_COUNT_CHECK) {
      countWebengageLoad++;
      setTimeout(() => updateAttributeInWebengage(attribute, value), 1000);
    }
  }
}


/**
 * This function checks and returns that webengage is not undefined
 *
 * @returns boolean
 *
 * @internal
 *
 */
function isWebengageDefined() {
  return typeof window !== 'undefined' && typeof window.webengage !== 'undefined';
}


/**
 * This function checks and returns that gtm is not undefined
 *
 * @returns boolean
 *
 * @internal
 *
 */
function isGtmDefined() {
  return typeof window !== 'undefined' && typeof window.dataLayer !== 'undefined';
}
