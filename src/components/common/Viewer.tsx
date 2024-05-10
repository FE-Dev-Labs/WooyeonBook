'use client';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import React from 'react';

export default function View({ content }: { content: string }) {
	return <Viewer initialValue={content} />;
}
