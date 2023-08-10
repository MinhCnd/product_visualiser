'use client'
import React, { useState } from 'react';
import Canvas from './_components/canvas';
import Form from './_components/form';

export default function Home() {

  const [text, setText] = useState('');

  const handleTextChange = (newValue: string) => {
    setText(newValue);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='view-container'>
        <div className='canvas-container'>
        <Canvas width={400} height={400} imageSrc='/Design_dim.png' text={text}/>
        </div>
        <div className="editor-container">
          <Form label="Text" value={text} onChange={handleTextChange}/>
        </div>
      </div>
    </main>
  )
}
