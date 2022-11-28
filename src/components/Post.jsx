import React from 'react'
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore"
import { db, auth } from "../firebase"
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"

export default function Post({post}) {

    const [liked, setLiked] = useState(false)

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id)
        await deleteDoc(postDoc)
    }

    const likePost = async (id) => {
        const postDoc = doc(db, "posts", id)

        await updateDoc(postDoc, {
            likes: arrayUnion(auth.currentUser.uid)
        })
        setLiked(true)
    }

    const unlikePost = async (id) => {
        const postDoc = doc(db, "posts", id)

        await updateDoc(postDoc, {
            likes: arrayRemove(auth.currentUser.uid),
        })
        setLiked(false)
    }

    useEffect(() => {
        const handleSearch = async (id) => {
            const postDoc = doc(db, "posts", id)
            const docSnap = await getDoc(postDoc)
            const likeArray = docSnap._document.data.value.mapValue.fields.likes.arrayValue.values
            if(!likeArray) return
            const isLiked = likeArray.filter(like => like.stringValue == auth.currentUser.uid)
            if(isLiked.length > 0) {
                setLiked(true)
            }
        }


        handleSearch(post.id)
    }, [])

  return (
    <div className='post'>
        <div className='postHeader'>
            <h1 className='title'>{post.title}</h1>
            {auth.currentUser.uid === post.author.id && 
            <div className="deletePost">
                <button onClick={() => deletePost(post.id)}>X</button>
            </div>
            }
        </div>
        {post.img && <img src={post.img} />}
        <div className='postTextContainer'>{post.post}</div>
        <div className='postFooter'>
            <Link to={`/user/${post.author.id}`}><h3>@{post.author.name}</h3></Link>
            <div className='likeDiv'>
                {liked ? (
					<FavoriteIcon onClick={() => unlikePost(post.id)} />
					) : (
					<FavoriteBorderIcon onClick={() => likePost(post.id)} />
				)}
                <h4 className='likes'>{post.likes.length}</h4>
            </div>
        </div>
    </div>
  )
}
