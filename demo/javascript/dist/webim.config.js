WebIM.config = {
    /*
    * The global value set for xmpp server
    */
    xmppURL: 'im-api.hyphenate.io',
    /*
    * The global value set for Easemob backend REST API
    */
    apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.hyphenate.io',
    /*
    *  Provide AppKey for connection
    *  连接时提供appkey
    */
    appkey: "hyphenatedemo#hyphenatedemo",
    /*
     * Whether to use HTTPS
     * 是否使用https
     */
    https : location.protocol === 'https:',
    /*
     * Whether to use multiple resources
     * 是否使用多resource
     */
    multiResources: false
};
