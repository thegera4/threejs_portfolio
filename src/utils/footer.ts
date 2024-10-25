// Utility functions for "Footer" section

/**
 * Function that opens a new tab with the url of the social media
 * @param {string} value - The value of the social media
 * @returns {void} Does not return anything but opens a new tab in the browser
 */
export const openTab = (value: string): void => {
  switch(value) {
    case 'github':
      window.open('https://www.github.com/thegera4', '_blank', 'noreferrer')
      break
    case 'linkedin':
      window.open('https://www.linkedin.com/in/juan-gerardo-medellin-ibarra-8b207058/', '_blank', 'noreferrer')
      break
    case 'playstore':
      window.open('https://play.google.com/store/apps/developer?id=Juan+Gerardo+Medellin+Ibarra', '_blank', 'noreferrer')
      break
    case 'privacy':
      window.open('https://app.enzuzo.com/policies/privacy/b69e150c-115f-11ef-be0e-af7e995914ab', '_blank', 'noreferrer')
      break
    default:
      break
  }
}