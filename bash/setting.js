let _setting, _src, _dist
_src = 'code/src'
let _devPath = 'code/dev'
let _distPath = 'code/build'
_setting = {
	path: _src,
	devPath: _devPath,
  devRepUrl:"http://test.storage.6city.com/sp/",
  buildRepUrl:"https://m.6city.com/sp/",
  buildPath: _distPath,
  watchFiles: ['code/src/**/*.*']
}
module.exports = _setting
