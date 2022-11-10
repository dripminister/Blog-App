import React from 'react'
import { useState } from 'react'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db, auth, storage } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'

export default function CreatePost() {

    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [post, setPost] = useState("")
    const [img, setImg] = useState(null)

    const postCollectionsRef = collection(db, "posts")

    const createPost = async () => {
        if (img) {
            const storageRef = ref(storage, img.name)
            uploadBytes(storageRef, img).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    addDoc(postCollectionsRef, {
                        title,
                        post,
                        author: {
                            name: auth.currentUser.displayName,
                            id: auth.currentUser.uid
                        },
                        createdAt: Timestamp.now(),
                        likes: [],
                        img: url
                    })
                })
            })
        } else {
            await addDoc(postCollectionsRef, {
                title,
                post,
                author: {
                    name: auth.currentUser.displayName,
                    id: auth.currentUser.uid
                },
                createdAt: Timestamp.now(),
                likes: [],
                img: null
            })
        }
    navigate("/")
}

  return (
    <div className='createPostPage'>
        <div className='create-post-container'>
    	    <h1>Create a post</h1>
            <div className='inputGp'>
                <label>Title: </label>
                <input placeholder='Title' type="text" onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className='inputGp'>
                <label>Post: </label>
                <textarea placeholder='Post' onChange={e => setPost(e.target.value)}/>
            </div>
            <label className='imgLabel'>
                {img ? "Image Added" : "Add Image (optional)"}
            <input type="file" onChange={(e) => setImg(e.target.files[0])}/>
            </label>
            <button onClick={createPost}>Submit Post</button>
        </div>
    </div>
  )
}
