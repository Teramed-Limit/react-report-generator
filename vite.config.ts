import {defineConfig} from 'vite';
import {extname, relative, resolve} from 'path';
import {fileURLToPath} from 'node:url';
import {glob} from 'glob';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import {libInjectCss} from 'vite-plugin-lib-inject-css';

// vite.config.ts
const isProduction = process.env.NODE_ENV === 'production';

const profiling = isProduction && {
	'react-dom/client': 'react-dom/profiling',
};

// https://vitejs.dev/config/
export default defineConfig({
	// optimizeDeps: {
	// 	include: ['@emotion/react', '@emotion/styled', '@mui/material/Tooltip'],
	// },
	// resolve: {
	// 	alias: {
	// 		...profiling,
	// 	},
	// },
	css: {
		preprocessorOptions: {
			scss: {
				silenceDeprecations: ['legacy-js-api'],
			},
		},
	},
	plugins: [
		react({
			// jsxImportSource: '@emotion/react',
			babel: {
				plugins: ['@emotion/babel-plugin'],
			},
		}),
		libInjectCss(),
		dts({ include: ['lib'] }),
		// dts({
		// 	include: [
		// 		'lib/main.ts',
		// 		'lib/types/**/*.ts',
		// 		'lib/ISVReport/ISVReport.tsx',
		// 		'lib/ISVReportPDF/ISVReportPDF.tsx',
		// 		'lib/ISVReportGenerator/ISVReportGenerator.tsx',
		// 	],
		// }),
		// visualizer({
		// 	open: true, // 在打包完成後自動打開瀏覽器顯示報告
		// 	filename: 'dist/bundle-visualizer.html', // 指定報告文件的名稱和位置
		// 	template: 'treemap', // 可視化報告的形式 ('sunburst', 'treemap', 'network')
		// }) as PluginOption,
	],
	build: {
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, 'lib/main.ts'),
			formats: ['es'],
		},
		rollupOptions: {
			external: [
				'react',
				'react-dom',
				'react/jsx-runtime',
				'@mui/material',
				'@mui/icons-material',
				'@emotion/react',
				'@emotion/styled',
				'@mui/x-date-pickers',
				'@react-pdf/renderer',
				'ag-grid-community',
				'ag-grid-react',
				'react-icons',
				'react-konva',
				'react-color',
				'konva',
				'date-fns',
				'date-fns-tz',
				'axios',
				'recoil',
				'rxjs',
				'use-image',
				'ramda',
				'dayjs',
			],
			input: Object.fromEntries(
				// https://rollupjs.org/configuration-options/#input
				glob
					.sync('lib/**/*.{ts,tsx}', {
						ignore: ['lib/**/*.d.ts'],
					})
					.map((file) => [
						// 1. The name of the entry point
						// lib/nested/foo.js becomes nested/foo
						relative('lib', file.slice(0, file.length - extname(file).length)),
						// 2. The absolute path to the entry file
						// lib/nested/foo.ts becomes /project/lib/nested/foo.ts
						fileURLToPath(new URL(file, import.meta.url)),
					]),
			),
			output: {
				assetFileNames: 'assets/[name][extname]',
				entryFileNames: '[name].js',
			},
		},
	},
});
