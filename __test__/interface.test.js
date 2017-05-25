import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme';


let log = console.log.bind(console)

// ignore errors with warning message
console.olderror = console.error
console.error = (...args) => {
    // log('fake', args)
    if (/Warning\:/.test(args[0])) return
    console.olderror.apply(console, args)
}

// before 在每个case之前只会执行一遍，所以清理缓存类似操作不能放在此处
beforeEach(() => {
    jasmineEnzyme();
});

require('../demo/javascript/dist/webim.config.js');


describe('webim-test', () => {

    it('test1: restAPI', done => {


        log(WebIM.config)
        log(WebIM.config.apiURL)

        var devInfos = WebIM.config.appkey.split('#');


        var orgName = devInfos[0];
        var appName = devInfos[1];

        let username = 'wenke'
        let pass = '123456'

        var loginJson = {
            grant_type: 'password',
            username: 'wenke',
            password: '123456',
            timestamp: new Date()
        }


        $.ajax({
            url: WebIM.config.apiURL + '/' + orgName + '/' + appName + '/token',
            type: 'GET',
            data: loginJson,
            error: function (jqXHR, textStatus, errorThrown) {
                expect(1).toBe(0)
                if (jqXHR) {
                    log('test1 error:', jqXHR)
                }
                done()
            },
            success: function (respData, textStatus, jqXHR) {
                expect(1).toBe(1)
                if (respData) {
                    log('test1 success:', respData)
                }
                done()
            }
        });

    })
});
