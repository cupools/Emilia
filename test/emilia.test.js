/* eslint-env mocha */
import { expect } from 'chai'
import fs from 'fs-extra'

import './css-plugin'
import Emilia from '../src/emilia'

describe('Emilia', function() {
    beforeEach(function() {
        fs.emptyDirSync('test/tmp')
    })

    it('should work with default options', function() {
        let emilia = new Emilia({
            src: ['test/fixtures/css/main.css'],
            dest: 'test/tmp/',
            output: 'test/tmp/',
            cssPath: './',
            prefix: '',
            algorithm: 'left-right',
            padding: 100,
            unit: 'px',
            convert: 1,
            quiet: true
        })

        expect(emilia.run.bind(emilia)).to.not.throw(Error)

        expect('test/tmp/tom.png').to.be.exist
        expect('test/tmp/jerry.png').to.be.exist
        expect('test/tmp/main.css').to
            .have.selector('.icon0').and.decl({
                background: '#ccc url(\'./tom.png\') no-repeat',
                'background-position': '0px 0px',
                'background-size': '1324px 256px'
            })
            .and.have.selector('.icon1').and.decl({
                background: 'url(\'./tom.png\') no-repeat',
                'background-position': '-356px 0px',
                'background-size': '1324px 256px'
            })
            .and.have.selector('.icon2').and.decl({
                background: 'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAXVBMVEUAAAD5vzv5vzv5vzv5vzv5vzv5vzv5vzv5vzv5vzv5vzv5vzv5vzv5vzv5vzv+//760H35w07+/PX98Nn84a/6zG/99OP87M/85br6yF/9+Oz86MX72Jf73aP71IsXwEBZAAAADnRSTlMA3lT4jAas5FsD2KZcB+crwqIAAAF4SURBVGje7dpbc4IwEIbhAIKndgk5gCD6/39mSRhDm+pdvkwP+97t1TOJwozjCl9dnouKEledzmUtQmVBoIpSrB13BGx39AjICIq/KwJXClHvCdy+FgeC9yYagteIguAVoiJ4laAMMcJIiBFGGGGEkX+NSJelUHLEmr5dU8O8zABk9kJokukRo9q4S3Kk9Q1GylHKi1oVAKLM+Jg64xmZHDHd59k6ZUiM6JG+dmuXOgI/jCq6Lwii/wwyZUBkjg9eA77CcQbwMMbNiNfKsyex78IMQLohMgCInSIDgJj1NR8MADJqR6j7Y0Ygd+WMIRwDgHTX6BgAZP3EdTgGAjH+GLcwI5CLM/oxzAhkdsaVQgjERgYE6SMDgPjL0rQFQaYFGWkLgdjosiDIbUEsbUGQYUHks1Iiun0RI8+y8kW09dt+YjPyLUYYYYQRRhj5mUiWP/1PBK/IsoiRZaUkx3LMe541H/zCUqbVK/wSWag+NIB1uKI51ML1AXQdIgBlF32qAAAAAElFTkSuQmCC\') no-repeat'
            })
            .and.have.selector('.icon6').and.decl({
                background: 'url(\'./jerry.png\') no-repeat',
                'background-position': '0px 0px',
                'background-size': '650px 300px'
            })
            .and.have.selector('.unexist').and.decl({
                background: 'url(\'../images/undefined.png\') no-repeat',
                'background-position': undefined,
                'background-size': '100px 100px'
            })
            .and.have.selector('.unexist-inline').and.decl({
                background: 'url(\'../images/undefined.png\') no-repeat',
                'background-position': undefined,
                'background-size': '100px 100px'
            })
    })

    it('should work with empty `src`', function() {
        let emilia = new Emilia({
            src: [],
            dest: 'test/tmp/',
            output: 'test/tmp/',
            quiet: true
        })

        expect(emilia.run.bind(emilia)).to.not.throw(Error)

        expect('test/tmp/main.css').to.not.be.exist
        expect('test/tmp/tom.png').to.not.be.exist
        expect('test/tmp/jerry.png').to.not.be.exist
    })

    it('should work with empty `dest`', function() {
        let emilia = new Emilia({
            src: ['test/fixtures/css/main.css'],
            dest: '',
            output: 'test/tmp/',
            quiet: true
        })

        expect(emilia.run.bind(emilia)).to.not.throw(Error)

        expect('test/tmp/main.css').to.not.be.exist
        expect('test/tmp/tom.png').to.not.be.exist
        expect('test/tmp/jerry.png').to.not.be.exist
    })
})