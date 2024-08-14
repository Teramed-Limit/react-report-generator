import React, { forwardRef } from 'react';

import { RecoilRoot } from 'recoil';

const withRecoilRoot = <P extends object>(Component: React.ComponentType<P & React.RefAttributes<any>>) => {
	const WithRecoilRootComponent = forwardRef<any, P>((props, ref) => {
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
