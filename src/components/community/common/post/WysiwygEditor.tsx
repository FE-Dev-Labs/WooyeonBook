'use client';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useRef } from 'react';

export default function WysiwygEditor() {
	const editorRef = useRef(null);
	const toolbarItems = [
		['heading', 'bold', 'italic', 'strike'],
		['hr'],
		['ul', 'ol', 'task'],
		['table', 'link'],
		['image'],
		['code'],
		['scrollSync'],
	];
	return (
		<>
			<Editor
				ref={editorRef}
				initialEditType="markdown"
				height="600px"
				toolbarItems={toolbarItems}
			/>
		</>
	);
}
