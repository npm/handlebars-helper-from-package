handlebars-helper-from-package
==============================

A helper to render handlebars partials whether they're in a package or not

An example:

```
var helper = require('handlebars-helper-from-package');
handlebars.registerHelper('fromPackage', helper);

template = handlebars.compile('{{fromPackage "@aredridel/test-packaged-patial/test.hbs" .. param="param Value"}}');
console.log(template());
```
