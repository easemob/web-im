WebIM.config = {
    /*
     * XMPP server
     */
    xmppURL: 'im-api.sandbox.easemob.com',
    /*
     * Backend REST API URL
     */
    apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.sdb.easemob.com',
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
    isMultiLoginSessions: true,
    /*
     * Set to auto sign-in
     */
    isAutoLogin: true 
};
