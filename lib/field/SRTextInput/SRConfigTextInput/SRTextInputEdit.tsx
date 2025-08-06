import React, { useEffect, useRef, useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import axios from 'axios';
import * as R from 'ramda';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { structReportParseApiAtom } from '../../../recoil/atoms/formDataAtoms.ts';
import {
	selectedAttributeAtom,
	selectedAttributePathAtom,
	selectedReportDefine,
	structureReportAtom,
} from '../../../recoil/atoms/report-generator-atoms.ts';
import { SRUtility } from '../../../service/sr-utility/sr-utility.ts';
import { SRTextField } from '../../../types/field/sr-text-field.ts';
import { SRTreeNode } from '../../../types/sr-tree.ts';
import BaseTextInput from '../../../UI/BaseTextInput/BaseTextInput.tsx';
import FileUpload from '../../../UI/FileUpload/FileUpload.tsx';
import { generateUUID, isEmptyOrNil, isNotEmptyOrNil } from '../../../utils/general.ts';

import { SRTreeItem } from './SRTreeItem/SRTreeItem';

interface Props {
	field: SRTextField;
	value: string;
	onValueChange: (value: string) => void;
	disabled: boolean;
}

const inputSubject = new Subject<string>();
const onlyOneAnchor = new BehaviorSubject<{ id: string; eventTarget: HTMLElement } | null>(null);

function SRTextInputEdit({ field, value, onValueChange, disabled }: Props) {
	const [srValue, setSRValue] = useState<string>('');
	//
	const structReportParseApi = useRecoilValue(structReportParseApiAtom);
	// Form Define Setter
	const attributePath = useRecoilValue(selectedAttributePathAtom);
	const setAttribute = useSetRecoilState(selectedAttributeAtom);
	const setFormDefine = useSetRecoilState(selectedReportDefine);
	const onSetAttribute = (attrValue: number | string | boolean) => {
		const path = ['structureReportPath'];
		setAttribute((pre) => {
			return R.assocPath(path, attrValue, pre);
		});
		setFormDefine((pre) => {
			return R.assocPath([...attributePath, ...path], attrValue, pre);
		});
	};

	// SR
	const [loadingSR, setLoadingSR] = useState(false);
	const [structureReportData, setStructureReportAtom] = useRecoilState(structureReportAtom);

	// Search
	const [searchTerm, setSearchTerm] = useState('');
	const [searchType, setSearchType] = useState<'Code' | 'Value'>('Value');
	const [expanded, setExpanded] = useState<string[]>(['root']);

	// Node Mapper
	const nodeMap = useRef({}).current;

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;

	// Event Handlers
	const onValueChangeHandler = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const onFocusHandler = (event) => {
		setExpanded(['root']);
		onlyOneAnchor.next({ id: field.id, eventTarget: event.currentTarget });
	};

	useEffect(() => {
		onlyOneAnchor.subscribe((event) => {
			if (event && event.id && event.eventTarget) {
				if (field.id !== event.id) setAnchorEl(null);
				else setAnchorEl(event.eventTarget as HTMLElement);
				return;
			}
			setAnchorEl(null);
		});
		return () => {
			onlyOneAnchor.next(null);
		};
	}, [field.id]);

	// 讀取SR檔案
	const loadStructureReportFile = (file: File) => {
		setLoadingSR(true);
		const formData = new FormData();
		formData.append('File', file);
		axios
			.post(structReportParseApi, formData)
			.then((res) => {
				setLoadingSR(false);
				setStructureReportAtom(res.data);
			})
			.catch((error) => {
				console.error(error);
				setLoadingSR(false);
			})
			.finally(() => {
				/* 不論失敗成功皆會執行 */
			});
	};

	// 獲取SR節點路徑的函數
	const getSRNodePath = (nodeId: string, type: 'Value' | 'ValueWithUnit') => {
		// 組合成完整的 SR 路徑
		const srPath = SRUtility.getSRNodePath(nodeId, type);
		onSetAttribute(srPath);
		setSRValue(SRUtility.parseSR(structureReportData, srPath));
	};

	// 渲染樹形結構的函數
	const renderTreeValue = (nodes: SRTreeNode) => {
		nodeMap[nodes.NodeId] = nodes;
		SRUtility.nodeMap[nodes.NodeId] = nodes;
		return Object.keys(nodes.Value)
			.filter((k) => k !== 'Code')
			.filter((k) => k !== 'ValueType')
			.filter((k) => nodes.Value[k] !== null)
			.map((key) => {
				// if (nodes.Value[key] === null) return null;
				return (
					<TreeItem
						// sx={{ color: found ? 'red' : 'black' }}
						key={generateUUID()}
						itemId={generateUUID()}
						label={`${key}: ${nodes.Value?.[key]}`}
					/>
				);
			});
	};

	const onSearchChange = (event) => {
		inputSubject.next(event.target.value);
	};

	// 使用useEffect進行事件訂閱和清理
	useEffect(() => {
		const subscription = inputSubject
			.pipe(
				map((v) => (v.length >= 2 ? v : '')),
				debounceTime(300), // 設置 debounce 時間為 500 毫秒
			)
			.subscribe((debouncedValue) => {
				setSearchTerm(debouncedValue);
				if (isEmptyOrNil(debouncedValue)) return;
				setExpanded(Object.keys(nodeMap));
			});

		// 清理訂閱
		return () => {
			subscription.unsubscribe();
		};
	}, [nodeMap]);

	const onExpandClick = () => {
		if (!structureReportData) return;
		setExpanded((oldExpanded) => (oldExpanded.length === 0 ? Object.keys(nodeMap) : []));
	};

	// 檢查節點是否匹配篩選條件
	const matchFilter = (node: SRTreeNode, type: 'Code' | 'Value'): boolean => {
		// 如果當前節點匹配，返回 true
		if (node?.Value[type] && node?.Value[type]?.toLowerCase().includes(searchTerm.toLowerCase())) {
			return true;
		}
		// 否則，遞迴檢查子節點
		return node?.Children && node?.Children?.some((child) => matchFilter(child, type));
	};

	const renderTree = (currentNode: SRTreeNode) => {
		if (isNotEmptyOrNil(searchTerm)) {
			// 如果是找節點的Code
			if (searchType === 'Code') {
				// 先檢查節點的Code是否匹配篩選條件
				const selfMatch = matchFilter(currentNode, searchType);

				// 如果有子節點，檢查子節點是否有匹配篩選條件
				const isSomeChildMatching = currentNode.Children.some((child) => matchFilter(child, searchType));

				// 如果此節點為Value節點，考慮上層節點的Code是否匹配篩選條件
				if (
					isNotEmptyOrNil(currentNode.Value.Value) &&
					matchFilter(currentNode.Parent as SRTreeNode, searchType)
				) {
					return (
						<SRTreeItem
							key={currentNode.NodeId}
							itemId={currentNode.NodeId}
							node={currentNode}
							label={currentNode.Value.Code}
							getSRNodePath={getSRNodePath}
						>
							{renderTreeValue(currentNode)}
						</SRTreeItem>
					);
				}

				// 如果自己和子節點都不匹配篩選條件，則不顯示當前節點
				if (!selfMatch && !isSomeChildMatching) return null;
			}

			// 如果是找節點的Value
			if (searchType === 'Value') {
				// 比較目前節點的Value是否匹配篩選條件
				const isCurrentNodeMatching = matchFilter(currentNode, searchType);

				// 檢查是否有子節點，且考慮子節點是否匹配篩選條件
				const isSomeChildNodeMatching = currentNode?.Children.some((child) => matchFilter(child, searchType));

				// 如果當前節點的父節點有Value，則要顯示此節點
				const isParentNodeHasValue = isNotEmptyOrNil(currentNode?.Parent?.Value?.Value);

				// 不顯示當前節點
				if (!isSomeChildNodeMatching && !isCurrentNodeMatching && !isParentNodeHasValue) {
					return null;
				}
			}
		}

		return (
			<SRTreeItem
				key={currentNode.NodeId}
				itemId={currentNode.NodeId}
				node={currentNode}
				label={currentNode.Value.Code}
				getSRNodePath={getSRNodePath}
			>
				{renderTreeValue(currentNode)}
				{Array.isArray(currentNode.Children) ? currentNode.Children.map((node) => renderTree(node)) : null}
			</SRTreeItem>
		);
	};

	return (
		<>
			<BaseTextInput
				id={field.id}
				placeholder={field?.placeholder || ''}
				disabled={disabled || field.readOnly}
				value={srValue}
				onValueChange={onValueChange}
				onKeyUp={onValueChangeHandler}
				onFocus={onFocusHandler}
				prefix={field.prefix}
				suffix={field.suffix}
			/>
			{!structureReportData ? (
				<FileUpload
					accept=".dcm"
					uiComponent={
						<LoadingButton sx={{ padding: 0 }} size="small" loading={loadingSR} variant="contained">
							Open SR
						</LoadingButton>
					}
					onFileChange={loadStructureReportFile}
				/>
			) : (
				<IconButton
					sx={{ padding: '2px', minWidth: '20px', minHeight: '20px' }}
					size="small"
					color="error"
					onClick={() => setStructureReportAtom(undefined)}
				>
					<RiDeleteBin6Fill />
				</IconButton>
			)}
			{structureReportData ? (
				<Popper id={id} sx={{ zIndex: '1000' }} open={open} anchorEl={anchorEl} disablePortal={false}>
					<Paper
						elevation={24}
						sx={{
							border: '1px solid darkgrey',
							m: 1,
							p: 1,
							bgcolor: 'background.paper',
							overflow: 'auto',
							maxHeight: 400,
							zIndex: 1001,
						}}
					>
						<Box
							sx={{
								position: 'sticky',
								top: 0,
								zIndex: 1100, // Ensure the box stays on top
								backgroundColor: 'white',
								boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
								padding: '0px 8px',
							}}
						>
							<FormControl size="small" sx={{ mr: '4px', minWidth: '120px' }}>
								<InputLabel>Search Type</InputLabel>
								<Select
									value={searchType}
									label="Search Type"
									onChange={(e) => {
										setSearchType(e.target.value as 'Code' | 'Value');
									}}
								>
									<MenuItem value="Value">Value</MenuItem>
									<MenuItem value="Code">Code</MenuItem>
								</Select>
							</FormControl>
							<TextField size="small" label="Term" variant="outlined" onChange={onSearchChange} />
							<Box>
								<Button onClick={onExpandClick}>
									{expanded.length === 0 ? 'Expand all' : 'Collapse all'}
								</Button>
								<Button
									onClick={() => {
										setAnchorEl(null);
										setSearchTerm('');
									}}
								>
									Close
								</Button>
							</Box>
						</Box>
						<SimpleTreeView sx={{ padding: 2 }}>{renderTree(structureReportData)}</SimpleTreeView>
					</Paper>
				</Popper>
			) : (
				<></>
			)}
		</>
	);
}

export default SRTextInputEdit;
