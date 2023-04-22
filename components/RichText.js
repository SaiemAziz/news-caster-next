import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from './Auth';
import { useRouter } from 'next/router';

const RichText = ({ setValue, value }) => {
  let [text, setText] = useState(value)
  const handleChange = (content, delta, source, editor) => {
    setValue(content);
  };
  return (
    <>
      <ReactQuill
        className='border bg-white border-info rounded-lg'
        value={value}
        onChange={handleChange}
        placeholder="Write the description in depth."
      // onBlur={() => {
      //   setValue(text)
      //   console.log(text)
      // }}
      />
    </>
  );
};

export default RichText;

//npm install react-quill quill

