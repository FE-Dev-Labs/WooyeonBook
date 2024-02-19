'use client';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useRef } from 'react';
import { supabase } from '@/utils/supabase/supabase';
interface WysiwygEditorProps {
	height?: string;
}

export default function WysiwygEditor({
	height = '600px',
}: WysiwygEditorProps) {
	const editorRef = useRef<Editor>(null);
	const toolbarItems = [
		['heading', 'bold', 'italic', 'strike'],
		['hr'],
		['ul', 'ol', 'task'],
		['table', 'link'],
		['image'],
		['code'],
		['scrollSync'],
	];
	// 전역으로 내용을 저장 할 생각
	//
	// console.log(editorRef.current?.getInstance().getMarkdown());
	const onUploadImage = async (
		blob: File,
		callback: (imageUrl: string, fileName: string) => void,
	) => {
		const { data, error } = await supabase.storage
			.from('editorImg')
			.upload('public/image.png', blob);

		if (data && data.path) {
			callback(
				`https://xdbequtksxewiorzzmqg.supabase.co/storage/v1/object/public/editorImg/${data.path}`,
				blob.name,
			);
		}
	};
	return (
		<>
			<Editor
				ref={editorRef}
				initialEditType="markdown"
				height={height}
				toolbarItems={toolbarItems}
				hooks={{ addImageBlobHook: onUploadImage }}
			/>
		</>
	);
}
