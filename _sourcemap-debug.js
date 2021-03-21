var sourceMap = require('source-map');
var fs = require('fs');

fs.readFile(__dirname+'/android/app/build/generated/sourcemaps/react/release/index.android.bundle.map', 'utf8', function (err, data) {
    var smc = new sourceMap.SourceMapConsumer(data);

    console.log(smc.originalPositionFor({
        line: 1,
        column: 1683668
    }));
});