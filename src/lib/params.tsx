export function parseStartParams(startParam?: string) {
  if (!startParam) {
    return {
      referralCode: '',
      deepLink: '',
    };
  }

  const [referralCode, deepLink] = startParam.split('___');

  /**
   * example: `abc___foo_bar_ba-z`
   * - referralCode: `abc`
   * - deepLink: `foo_bar_ba-z` -> `foo/bar/ba-z`
   */

  return {
    referralCode,
    deepLink: deepLink.replace(/_/g, '/'),
  };
}
