import { TimeAgo } from './TimeAgo'
import { PostAuthor } from './PostAuthor'
import { Link } from 'react-router-dom'
import { ReactionButtons } from './ReactionButtons'
import { memo } from 'react'
// import { selectPostById } from './postsSlice'
import { useSelector } from 'react-redux'

export const PostExcerpt = memo(({ post }) => {
  // const post = useSelector(state => selectPostById(state, postId))
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
})
