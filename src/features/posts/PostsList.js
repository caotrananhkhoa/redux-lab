import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectAllPosts, fetchPosts } from './postsSlice'
import { Spinner } from '../../components/Spinner'
import { PostExcerpt } from './PostExcerpt'

export const PostsList = () => {
  const dispatch = useDispatch()
  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)
  const posts = useSelector(selectAllPosts)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content
  
  const users = useSelector(state => state.users)
  console.log(">> ", users)

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
