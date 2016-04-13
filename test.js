const tap = require('tap');
const handlebars = require('handlebars');
handlebars.registerHelper('fromPackage', require('./'));
handlebars.registerPartial('registered', 'Present!');

tap.test('it renders a packaged partial', function (t) {
    t.equal(handlebars.compile('{{fromPackage "@aredridel/test-packaged-partial/test.hbs" place="World"}}')({
        place: "Camelot"
    }), 'Hello, World!\n', 'hash argument overrides context');
    t.equal(handlebars.compile('{{fromPackage "@aredridel/test-packaged-partial/test.hbs"}}')({
        place: "Camelot"
    }), 'Hello, Camelot!\n', 'context supplies value');
    t.equal(handlebars.compile('{{fromPackage "@aredridel/test-packaged-partial/test.hbs" outside }}')({
        outside: {
            place: "The Moon"
        },
        place: "Camelot"
    }), 'Hello, The Moon!\n', 'explicit context supplies value');
    t.equal(handlebars.compile('{{fromPackage "registered"}}')(), 'Present!', 'Normally registered partials work');
    t.end();
});
