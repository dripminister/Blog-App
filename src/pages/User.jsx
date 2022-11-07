import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getDocs, collection, query, orderBy, where } from 'firebase/firestore'
import { db } from "../firebase"
import Post from '../components/Post'
import { useParams } from 'react-router-dom'

export default function User() {

    const { id } = useParams()

    const [posts, setPosts] = useState([])
    const postCollectionsRef = collection(db, "posts")

    useEffect(() => {
        const getPosts = async () => {
            const q = query(postCollectionsRef, where("author.id", "==", id))
            const data = await getDocs(q)
            setPosts(data.docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        getPosts()

    }, [postCollectionsRef])

    

  return (
    <div className='homePage'>
        <h1>User Page</h1>
        {posts && posts.map(post =>(
            <Post key={post.id} post={post}/>
        ))}
    </div>
  )
}
