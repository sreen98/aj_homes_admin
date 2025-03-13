import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link'],
  ['clean'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ script: 'sub' }, { script: 'super' }]
];

const modules = {
  toolbar: toolbarOptions
};

const TextEditor = ({
  onChange,
  value,
  width = '100%'
}: {
  width?: string;
  value: string;
  onChange: (value: any) => void;
}) => {
  return (
    <div style={{ paddingLeft: '10px', width: width }}>
      <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} style={{ width: width }} />
    </div>
  );
};

export default TextEditor;
