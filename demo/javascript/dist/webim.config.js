WebIM.config = {
    /*
    * XMPP server
    */
    xmppURL: 'im-api.hyphenate.io',
    /*
    * Hyphenate backend REST API URL
    */
    apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.hyphenate.io',
    /*
    * Hyphenate application AppKey
    */
    appkey: "hyphenatedemo#hyphenatedemo",
    /*
     * use HTTPS?
     */
    https : location.protocol === 'https:',
    /*
     * Multiple resources
     */
    multiResources: false,
    /*
     * Set to auto sign-in
     */
    autoPresence: true
};
