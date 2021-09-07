import React, { useState, useRef } from 'react'
import { collection, addDoc, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getStorage, ref, uploadBytesResumable } from '@firebase/storage';

function InputForm() {
  const [ imageToPost, setImageToPost ] = useState(null);
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const storage = getStorage();

  const sendPost = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;

    try {
      addDoc(collection(db, "session"), {
        message: inputRef.current.value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(doc => {
        console.log('xxx', doc)

      })
      console.log("Successfully uploaded to Firebase ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    inputRef.current.value = '';
  }

  const sendImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[ 0 ]) {
      reader.readAsDataURL(e.target.files[ 0 ])
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    }
  }

  const removeImage = () => {
    setImageToPost(null)
  }

  return (
    <div>
      <form onSubmit={sendPost}>
        <div onClick={() => filePickerRef.current.click()}>
          <a href='#'>Image Upload</a>
          <input
            type='file'
            onChange={sendImage}
            ref={filePickerRef}
            hidden
          />
        </div>
        <input
          type='text'
          placeholder='add some text here'
          ref={inputRef}
        />
        <button type='submit'>Upload</button>
      </form>
      {imageToPost && (
        <div onClick={removeImage}>
          <img src={imageToPost} alt='' className='session-image' styles='height: 30px; width: 30px' />
        </div>
      )}
    </div>
  )
}

export default InputForm
