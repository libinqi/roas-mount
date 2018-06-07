var fs = require('fs');

function mount(dir) {
    if (!dir) return null;

    if (!fs.existsSync(dir)) {
        throw "roas-mount error: " + dir + ",not found";
    }

    var requires = {};

    fs
        .readdirSync(dir)
        .filter(function (file) {
            return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js' || file.slice(-3) === '.ts' || file.slice(-3) === '.json');
        })
        .forEach(function (file) {
            var fileName = file.substring(0, file.indexOf('.'));
            var m = require(dir + '/' + file);
            if (m) {
                requires[fileName] = m;
                //console.log('mount completed:' + dir + '/' + file);
            }
        });

    return requires;
}

module.exports = mount;