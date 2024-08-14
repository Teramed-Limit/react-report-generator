import React, { forwardRef, RefAttributes } from 'react';

import { RecoilRoot } from 'recoil';

const withRecoilRoot = <P extends object>(Component: React.ComponentType<P>) => {
	const WithRecoilRootComponent = forwardRef<any, P & RefAttributes<any>>((props, ref) => {
		return (
			<RecoilRoot override={false}>
				<Component ref={ref} {...props} />
			</RecoilRoot>
		);
	});

	WithRecoilRootComponent.displayName = `WithRecoilRoot(${Component.displayName || Component.name || 'Component'})`;

	return WithRecoilRootComponent;
};

export default withRecoilRoot;
