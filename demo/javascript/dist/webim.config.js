WebIM.config = {
    /*
     * XMPP server
     */
    xmppURL: 'im-api.hyphenate.io',
    /*
     * Backend REST API URL
     */
    apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.hyphenate.io',
    /*
     * Application AppKey
     */
    appkey: "hyphenatedemo#hyphenatedemo",
    /*
     * Whether to use HTTPS
     * @parameter {Boolean} true or false
     */
    https : '',
    /*
     * Multiple resources
     * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
     * false: A visitor can sign in to only one webpage and receive messages at the webpage.
     */
    multiResources: false,
    /*
     * Set to auto sign-in
     */
    isAutoLogin: true
};
