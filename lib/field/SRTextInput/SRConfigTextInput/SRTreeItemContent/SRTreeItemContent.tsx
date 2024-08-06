import * as React from 'react';

// import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTreeItemState } from '@mui/x-tree-view';
import { TreeItemContentProps } from '@mui/x-tree-view/TreeItem/TreeItemContent';
import clsx from 'classnames';

export const SRTreeItemContent = React.forwardRef(function CustomContent(props: TreeItemContentProps, ref) {
	const { classes, className, label, itemId, icon: iconProp, expansionIcon, displayIcon } = props;

	const { disabled, expanded, selected, focused, handleExpansion, handleSelection, preventSelection } =
		useTreeItemState(itemId);

	const icon = iconProp || expansionIcon || displayIcon;

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		preventSelection(event);
	};

	const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		handleExpansion(event);
	};

	const handleSelectionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		handleSelection(event);
		handleExpansionClick(event);
	};

	return (
		<div
			ref={ref as React.Ref<HTMLDivElement>}
			className={clsx(className, classes.root, {
				[classes.expanded]: expanded,
				[classes.selected]: selected,
				[classes.focused]: focused,
				[classes.disabled]: disabled,
			})}
			onMouseDown={handleMouseDown}
		>
			<div onClick={handleExpansionClick} className={classes.iconContainer}>
				{icon}
			</div>
			<Typography onClick={handleSelectionClick} component="div" className={classes.label}>
				{label}
			</Typography>
			{props.children}
		</div>
	);
});
