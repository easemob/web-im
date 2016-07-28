WebIM.config = {
    /*
        The global value set for xmpp server
    */
    xmppURL: 'im-api.easemob.com',
    /*
        The global value set for Easemob backend REST API
    */
    apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
    /*
        连接时提供appkey
    */
    appkey: "easemob-demo#chatdemoui",
    /*
     * 是否使用https
     */
    https : location.protocol === 'https:',
    /*
     * 是否使用多resource
     */
    multiResources: false
};
