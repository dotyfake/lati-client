import React from 'react'
import { motion, AnimatePresence } from "framer-motion"

type Props = {
    children: React.ReactNode;
}

const PageAnimate = (props: Props) => {
  return (
          <div style={{overflow: 'hidden'}}>
              <motion.div
              initial={{ opacity: 0, x: '100vw'}}
              animate={{ opacity: 1, x: 0}}
              exit={{ opacity: 0, x: '-100vw' }}
              >
                  {props.children}
              </motion.div>
          </div>
  )
}

export default PageAnimate