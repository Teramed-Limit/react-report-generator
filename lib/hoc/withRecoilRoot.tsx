import React from 'react';

import { RecoilRoot } from 'recoil';

const withRecoilRoot = (WrappedComponent) => {
	function ComponentWithExtraInfo(props) {
		// At this point, the props being passed in are the original props the component expects.
		return (
			<RecoilRoot override={false}>
				<WrappedComponent {...props} />
			</RecoilRoot>
		);
	}

	return ComponentWithExtraInfo;
};

export default withRecoilRoot;
