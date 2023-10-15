import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
// import {
//   selectAllPosts,
//   fetchPosts,
//   selectPostIds,
//   selectPostById,
// } from './postsSlice'
import { Spinner } from '../../components/Spinner'
import { PostExcerpt } from './PostExcerpt'
import { useGetPostsQuery } from '../api/apiSlice'
import classnames from 'classnames'

export const PostsList = () => {
  // const dispatch = useDispatch()
  // const orderedPostIds = useSelector(selectPostIds)
  // const postStatus = useSelector((state) => state.posts.status)
  // const error = useSelector((state) => state.posts.error)
  // const posts = useSelector(selectAllPosts)
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsQuery()

  // useEffect(() => {
  //   if (postStatus === 'idle') {
  //     dispatch(fetchPosts())
  //   }
  // }, [postStatus, dispatch])

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice()
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])

  let content

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))
    const containerClassname = classnames('posts-container', {
      disabled: isFetching,
    })
    content = <div className={containerClassname}>{renderedPosts}</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {content}
    </section>
  )
}
