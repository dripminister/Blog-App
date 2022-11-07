import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getDocs, collection, query, orderBy } from 'firebase/firestore'
import { db } from "../firebase"
import Post from '../components/Post'

export default function Home() {

    const [posts, setPosts] = useState([])
    const postCollectionsRef = collection(db, "posts")

    useEffect(() => {
        const getPosts = async () => {
            //const data = await getDocs(postCollectionsRef)
            const q = query(postCollectionsRef, orderBy("createdAt", "desc"))
            const data = await getDocs(q)
            setPosts(data.docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        getPosts()

    }, [postCollectionsRef])

    

  return (
    <div className='homePage'>
        <h1>Home Page</h1>
        {posts && posts.map(post =>(
            <Post key={post.id} post={post}/>
        ))}
    </div>
  )
}
