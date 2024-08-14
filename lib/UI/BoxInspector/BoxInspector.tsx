import React from 'react';

import './BoxInspector.module.scss';

interface Props {
	paddingTop: string | number;
	paddingBottom: string | number;
	paddingLeft: string | number;
	paddingRight: string | number;
	marginTop: string | number;
	marginBottom: string | number;
	marginLeft: string | number;
	marginRight: string | number;
	children: React.ReactNode;
}

function BoxInspector({
	paddingTop,
	paddingBottom,
	paddingLeft,
	paddingRight,
	marginTop,
	marginBottom,
	marginLeft,
	marginRight,
	children,
}: Props) {
	return (
		<div
			style={{
				width: '100%',
				maxWidth: '100%',
				display: 'flex',
				position: 'relative',
			}}
		>
			{/* padding */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: marginLeft,
					width: paddingLeft,
					height: '100%',
					backgroundColor: '#A8CF97',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					top: marginTop,
					left: 0,
					height: paddingTop,
					width: '100%',
					backgroundColor: '#A8CF97',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					top: 0,
					right: marginRight,
					width: paddingRight,
					height: '100%',
					backgroundColor: '#A8CF97',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					bottom: marginBottom,
					left: 0,
					height: paddingBottom,
					width: '100%',
					backgroundColor: '#A8CF97',
				}}
			/>
			{/* margin */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					height: marginTop,
					width: '100%',
					backgroundColor: '#F2BF7F',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					height: marginBottom,
					width: '100%',
					backgroundColor: '#F2BF7F',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					height: '100%',
					width: marginLeft,
					backgroundColor: '#F2BF7F',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
					height: '100%',
					width: marginRight,
					backgroundColor: '#F2BF7F',
				}}
			/>
			{children}
		</div>
	);
}

export default BoxInspector;
