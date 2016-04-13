"use strict";
const fs = require('fs');
const resolve = require('resolve');
const handlebars = require('handlebars');

module.exports = function fromPackage(template, context, opts) {
    if (typeof opts == 'undefined') {
        opts = context;
        context = this;
    }

    const subcontext = opts.hash ? Object.assign(handlebars.createFrame(context), opts.hash) : context;

    if (!handlebars.partials[template]) {
        handlebars.registerPartial(template, fs.readFileSync(resolve.sync(template), 'utf-8'));
    }

    if (typeof handlebars.partials[template] != 'function') {
        handlebars.partials[template] = handlebars.compile(handlebars.partials[template]);
    }

    return new handlebars.SafeString(handlebars.partials[template](subcontext, opts));
};
