WebIM.config = {
    /*
     * XMPP server
     */
    xmppURL: 'im-api.easemob.com',
    // xmppURL: '172.17.2.172:5280',
    /*
     * Backend REST API URL
     */
    apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
    // apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//172.17.2.172:8080',
    /*
     * Application AppKey
     */
    appkey: 'easemob-demo#chatdemoui',
    /*
     * Whether to use HTTPS
     * @parameter {Boolean} true or false
     */
    https: '',
    /*
     * isMultiLoginSessions
     * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
     * false: A visitor can sign in to only one webpage and receive messages at the webpage.
     */
    isMultiLoginSessions: false,
    /*
     * Set to auto sign-in
     */
    isAutoLogin: true
};
