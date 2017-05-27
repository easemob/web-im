// require('./web/index.html')

// require('app/main.jsx')
//
describe('login test', function () {
    beforeEach(function () {
        var root = document.createElement('div')
        root.id = 'smartadmin-root'
        document.body.appendChild(root)
    });

    beforeEach(function () {
        require('app/main.jsx')
    })

    it(" when login button clicked , page should redirect to / ", function (done) {
        // expect(window.location.hash).toBe('#/login')
        setTimeout(() => {
            $('[name="username"]').val('easemobevaadmin')
            $('[name="password"]').val('evaadmin$*@^$(')
            let verify = $(".btn-verify").text()
            let verifyArray = verify.split("+")
            let sumVerify = verifyArray.reduce((a, b) => parseInt(a) + parseInt(b))
            $('[name="verification"]').val(sumVerify)
            $('[type="submit"]').click()

            setTimeout(() => {
                console.log('done')
                
                expect(window.location.hash).toBe('#/')

                done()
            }, 1000)
        }, 1000)


    })
})


console.log(window.innerHeight)
