const path = require("path")
const autoprefixer = require("autoprefixer")

module.exports = {
	module: {
		rules: [
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"],
				include: path.resolve(__dirname, "../")
			},
			{
				test: /\.css$/,
				use: [
					require.resolve("style-loader"),
					{
						loader: require.resolve("css-loader"),
						options: {
							importLoaders: 1
						}
					},
					{
						loader: require.resolve("postcss-loader"),
						options: {
							// Necessary for external CSS imports to work
							// https://github.com/facebookincubator/create-react-app/issues/2677
							ident: "postcss",
							plugins: () => [
								require("postcss-flexbugs-fixes"),
								autoprefixer({
									browsers: [
										">1%",
										"last 4 versions",
										"Firefox ESR",
										"not ie < 9" // React doesn't support IE8 anyway
									],
									flexbox: "no-2009"
								})
							]
						}
					}
				]
			},
			// ** STOP ** Are you adding a new loader?
			// Remember to add the new extension(s) to the "file" loader exclusion list.
			{
				test: /\.less$/,
				use: [
					require.resolve("style-loader"),
					{
						loader: require.resolve("css-loader")
						// options: {
						// 	importLoaders: 1
						// }
					},
					{
						loader: require.resolve("postcss-loader"),
						options: {
							// Necessary for external CSS imports to work
							// https://github.com/facebookincubator/create-react-app/issues/2677
							ident: "postcss",
							plugins: () => [
								require("postcss-flexbugs-fixes"),
								autoprefixer({
									browsers: [
										">1%",
										"last 4 versions",
										"Firefox ESR",
										"not ie < 9" // React doesn't support IE8 anyway
									],
									flexbox: "no-2009"
								})
							]
						}
					},
					{
						loader: require.resolve("less-loader"),
						options: {
							// TODO 通过theme.js定义antd组件样式，并且支持按照依赖导入  https://ant.design/docs/react/customize-theme-cn
							// TODO custom style by theme.js,  https://ant.design/docs/react/customize-theme-cn
							// modifyVars: getThemeConfig()
						}
					}
				]
			}
		]
	}
}
