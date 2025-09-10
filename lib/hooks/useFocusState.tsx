import { useRecoilState } from 'recoil';
import { isFieldsetTemplateFocus } from '../recoil/atoms/report-generator-atoms.ts';

/**
 * 專門處理 focus 狀態的 hook
 */
export function useFocusState(path: (string | number)[]) {
	const [isFocus, setFocus] = useRecoilState(isFieldsetTemplateFocus(path));

	const setActive = () => setFocus(true);
	const setInactive = () => setFocus(false);

	return {
		isFocus,
		setActive,
		setInactive,
		setFocus,
	};
}
