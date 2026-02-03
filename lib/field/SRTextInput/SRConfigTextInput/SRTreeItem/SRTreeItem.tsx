import * as React from 'react';

import { Button, Stack } from '@mui/material';
import { TreeItem, TreeItemProps } from '@mui/x-tree-view/TreeItem';

import { SRTreeNode } from '../../../../types/sr-tree.ts';

interface Props extends TreeItemProps {
	node: SRTreeNode;
	getSRNodePath: (nodeIds: string, type: 'Value' | 'ValueWithUnit') => void;
}

export function SRTreeItem({ node, getSRNodePath, children, ...other }: Props) {
	return (
		<TreeItem {...other}>
			{children}
			{node?.Value?.Value && (
				<Stack direction="row">
					<Button
						sx={{ height: '20px', ml: '30px', mb: '8px' }}
						size="small"
						variant="contained"
						color="primary"
						onClick={() => getSRNodePath(node.NodeId, 'Value')}
					>
						Apply Value
					</Button>
				</Stack>
			)}
		</TreeItem>
	);
}
