import { SRTreeNode } from '../../types/sr-tree.ts';

export const SRUtility = {
	nodeMap: {},
	getSRNodePath: (nodeId: string, type: 'Value' | 'ValueWithUnit') => {
		const selectNode: SRTreeNode = SRUtility.nodeMap[nodeId];

		if (!selectNode?.Value) return undefined;

		let currentNode: SRTreeNode = selectNode;
		const pathList: string[] = [];

		// 遞迴處理所有子節點，生成條件路徑
		const getChildrenConditionPath = (node: SRTreeNode): string => {
			let conditionPath = '';

			node.Children.forEach((child) => {
				if (child.Value.Code && child.Value.Value && !child.Value.Unit) {
					// 使用明確的結構來描述每一層的條件
					const childCondition = `${child.Value.Code}=${child.Value.Value}`;

					// 遞迴處理子節點的子條件
					const nestedConditions = getChildrenConditionPath(child);
					if (nestedConditions) {
						conditionPath += `|${childCondition}[${nestedConditions}]`;
					} else {
						conditionPath += `|${childCondition}`;
					}
				}
			});

			// 去掉條件的開頭 `|`
			return conditionPath.startsWith('|') ? conditionPath.substring(1) : conditionPath;
		};

		// 追溯父節點並生成路徑
		while (currentNode) {
			if (currentNode.NodeId === nodeId) {
				// 對於選取的節點，加入其所有子節點的條件
				const conditionPath = getChildrenConditionPath(currentNode);
				pathList.push(`${currentNode.Value.Code}#${type}${conditionPath ? `|${conditionPath}` : ''}`);
			} else {
				// 對於非選取節點，僅加入節點代碼
				// 將選擇節點的父節點之第一個節點為條件
				const firstChild = currentNode.Children[0] as SRTreeNode;

				if (firstChild && !firstChild.Value.Unit && firstChild.Value.Code && firstChild.Value.Value) {
					pathList.push(`${currentNode.Value.Code}|${firstChild.Value.Code}=${firstChild.Value.Value}`);
				} else {
					pathList.push(`${currentNode.Value.Code}`);
				}
			}
			// 更新當前節點為其父節點
			currentNode = currentNode.Parent ? SRUtility.nodeMap[currentNode.Parent.NodeId] : null;
		}

		// 組合成完整的 SR 路徑
		return pathList.reverse().join('\\');
	},
	parseSR: (treeNode: SRTreeNode, srPath: string) => {
		// 遞迴函數用於根據路徑逐層查找
		function findTargetNode(root: SRTreeNode, path: string): { node: SRTreeNode; valueKey: string } | null {
			const segments = path.split('\\');

			// 遞迴函數逐層遍歷樹結構
			function traverse(node: SRTreeNode, index: number): { node: SRTreeNode; valueKey: string } | null {
				if (index >= segments.length) return null;

				// 處理當前層的節點
				const segment = segments[index];
				const [codeWithKey, ...conditions] = segment.split('|');
				const [actualCode, valueKey] = codeWithKey.includes('#') ? codeWithKey.split('#') : [codeWithKey, null];

				// 確認當前節點的 Code 是否匹配
				if (node.Value.Code !== actualCode) return null;

				// 處理條件的遞迴函數
				// eslint-disable-next-line @typescript-eslint/no-shadow
				const processConditions = (node: SRTreeNode, conditionString: string): boolean => {
					let currentNode = node;
					const conditionPattern = /([^[\]=]+)=([^[\]]+)(\[[^[\]]+\])?/g;
					let match;

					// eslint-disable-next-line no-cond-assign
					while ((match = conditionPattern.exec(conditionString)) !== null) {
						// eslint-disable-next-line @typescript-eslint/naming-convention
						const [_, childCode, expectedValue, nestedConditions] = match;

						// 查找符合條件的子節點
						const matchingChild = currentNode.Children.find(
							(child) => child.Value.Code === childCode && child.Value.Value === expectedValue,
						);

						if (!matchingChild) return false;

						// 如果有嵌套條件，遞迴檢查子節點
						if (nestedConditions) {
							const innerConditions = nestedConditions.slice(1, -1); // 去掉 []
							if (!processConditions(matchingChild, innerConditions)) return false;
						}

						// 更新當前節點為找到的匹配子節點
						currentNode = matchingChild;
					}
					return true;
				};

				// 處理當前節點的所有條件
				// eslint-disable-next-line no-restricted-syntax
				for (const condition of conditions) {
					if (!processConditions(node, condition)) return null;
				}

				// 如果當前節點是目標節點，則返回該節點和對應的值鍵
				if (valueKey) {
					return { node, valueKey };
				}

				// 如果還有剩餘的層級，繼續遞迴遍歷子節點
				// eslint-disable-next-line no-restricted-syntax
				for (const child of node.Children) {
					const result = traverse(child, index + 1);
					if (result) return result;
				}

				// 如果找不到匹配的節點，返回 null
				return null;
			}

			return traverse(root, 0);
		}

		const result = findTargetNode(treeNode, srPath);

		return result.node.Value[result.valueKey];
	},
};
