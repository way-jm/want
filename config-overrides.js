const {override, fixBabelImports,addLessLoader,useEslintRc} = require('customize-cra');
module.exports = override(
	addLessLoader(),
	fixBabelImports('import', {
	  libraryName: 'antd',
	  libraryDirectory: 'es',
	  style: 'css',
	}),
);
