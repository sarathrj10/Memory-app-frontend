import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch,useSelector } from 'react-redux';
import {commentPost} from '../Posts/action'

import useStyles from './style';

const Comments = ({post}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.authData)
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post?.comments);
    const classes = useStyles();
    const commentsRef = useRef()
    const handleComment = async () => {
        const finalComment = `${user.result.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalComment,post._id))
        setComments(newComments)
        setComment('')
        commentsRef.current.scrollIntoView({behavior:'smooth'})
    };
    return (
      <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user && (
            <div style={{ width: '70%' }}>
                <Typography gutterBottom variant="h6">Write a comment</Typography>
                  <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                  <br />
                  <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
                  Comment
                  </Button>
              </div>
        )}
      </div>
    </div>
    )
}

export default Comments
