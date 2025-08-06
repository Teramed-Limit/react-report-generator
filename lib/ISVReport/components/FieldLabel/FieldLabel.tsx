import React, { CSSProperties } from 'react';

import { Box, Tooltip } from '@mui/material';
import cx from 'classnames';
import { FaInfoCircle } from 'react-icons/fa';

import { isEmptyOrNil } from '../../../utils/general.ts';

import classes from './FieldLabel.module.scss';

interface Props {
	id: string;
	label?: string;
	labelStyle?: CSSProperties;
	hint?: string;
	hideLabelSection?: boolean;
	hasValidation: boolean;
	prefixComp?: React.JSX.Element;
	suffixComp?: React.JSX.Element;
}

function FieldLabel({
	id,
	label = '',
	labelStyle = {},
	hint = '',
	hideLabelSection = false,
	hasValidation = false,
	prefixComp,
	suffixComp,
}: Props) {
	return (
		<>
			{hideLabelSection ? null : (
				<Box id={`formSectionLabel__${id}`} sx={{ ...labelStyle }}>
					{label ? (
						<Box
							component="span"
							className={cx(classes, {
								[classes.requiredStar]: hasValidation,
							})}
						>
							{prefixComp}
							{label}
							{suffixComp}
							{!isEmptyOrNil(hint) ? (
								<Tooltip title={hint}>
									<div className={classes.inline}>
										<FaInfoCircle color="rgb(239, 171, 61)" />
									</div>
								</Tooltip>
							) : null}
						</Box>
					) : null}
				</Box>
			)}
		</>
	);
}

export default FieldLabel;
