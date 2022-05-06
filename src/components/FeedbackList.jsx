import {motion, AnimatePresence} from 'framer-motion'
import { useContext } from 'react'
import React from 'react'
import FeedbackItem from './FeedbackItem'
import FeedbackContext from '../context/FeedbackContext'

/**
 * The FeedbackList function is a React component that renders a list of FeedbackItem components.
 * @returns An array of objects.
 */
  function FeedbackList() {
  const {feedback} = useContext(FeedbackContext)

  if(!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>
  }

  return (
    <div className='feedback-list'>
      <AnimatePresence>
      {feedback.map((item) => (
        <motion.div 
        key={(item.id)}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
          <FeedbackItem
          key={item.id}
          item={item} 
          />
        </motion.div>
      ))}
      </AnimatePresence>
    </div>
  )
}

export default FeedbackList


