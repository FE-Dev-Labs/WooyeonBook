'use client';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { supabase } from '@/utils/supabase/supabase';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { editorImgArr, editorText } from '@/recoil/atom/editorAtom';
import { useEffect, useRef } from 'react';
import {
	BookMeetingDataType,
	BookReportDataType,
} from '@/types/community/post/data';
import uuid from 'react-uuid';

interface UpdateEdiorProps {
	height?: string;
	data?: BookReportDataType | BookMeetingDataType;
}

export default function UpdateEdior({
	height = '600px',
	data,
}: UpdateEdiorProps) {
	const ref = useRef<Editor>(null);

	useEffect(() => {
		if (data) {
			ref.current?.getInstance().setMarkdown(data.content);
		}
	}, []);
	const toolbarItems = [
		['heading', 'bold', 'italic', 'strike'],
		['hr'],
		['ul', 'ol', 'task'],
		['table', 'link'],
		['image'],
		['code'],
		['scrollSync'],
	];
	const setText = useSetRecoilState(editorText);
	const [imgArr, setImgArr] = useRecoilState(editorImgArr);

	const onChangeText = () => {
		setText(ref?.current?.getInstance().getMarkdown());
	};
	const onUploadImage = async (
		blob: File,
		callback: (imageUrl: string, fileName: string) => void,
	) => {
		const { data, error } = await supabase.storage
			.from('editorImg')
			.upload(`public/${uuid()}.png`, blob);

		if (data && data.path) {
			callback(
				`https://xdbequtksxewiorzzmqg.supabase.co/storage/v1/object/public/editorImg/${data.path}`,
				blob.name,
			);
			setImgArr([
				...imgArr,
				`https://xdbequtksxewiorzzmqg.supabase.co/storage/v1/object/public/editorImg/${data.path}`,
			]);
		}
		if (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Editor
				ref={ref}
				initialEditType="markdown"
				previewStyle="vertical"
				height={height}
				toolbarItems={toolbarItems}
				hooks={{ addImageBlobHook: onUploadImage }}
				onChange={onChangeText}
			/>
		</>
	);
}
