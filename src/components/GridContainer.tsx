import {CardCharacter} from './CardCharacter';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

import { motion } from 'framer-motion'
import React from 'react';

const useDelayedLoading = (isLoading, minDelay = 500) => {
  const [showSkeleton, setShowSkeleton] = React.useState(true);

  React.useEffect(() => {
    let timeout;
    if (!isLoading) {
      // Aguarda o tempo mínimo antes de esconder o skeleton
      timeout = setTimeout(() => {
        setShowSkeleton(false);
      }, minDelay);
    } else {
      setShowSkeleton(true); // Reativa o skeleton se loading for true
    }

    return () => clearTimeout(timeout);
  }, [isLoading, minDelay]);

  return showSkeleton;
};

export default function GridContainer({ data, state, fetchMore }: any) {
  const setObserver = useIntersectionObserver(fetchMore)

  const showSkeleton = useDelayedLoading(state.isLoading, 800);

const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

  return (
    <motion.ul
    variants={containerVariant}
    initial="hidden"
    animate="show"
    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2
    sm:max-w-[96rem]">
      {data?.map((character, idx) => {
        const isTheLastOne = data.length - 1 === idx;
            if (isTheLastOne) {
              return (
                <motion.li key={character.id} variants={itemVariant} ref={setObserver}>
                  {showSkeleton ? (<div className="w-[18rem] h-20 bg-gray-800 rounded-md"></div>) : <CardCharacter data={character} />}
                </motion.li>
              )};
            return (
              <motion.li key={character.id} variants={itemVariant}>
              {showSkeleton ? (<div className="w-[18rem] h-[25rem] bg-gray-800 rounded-md"></div>) : <CardCharacter data={character} />}
              </motion.li>
            )
    })}
    </motion.ul>
  )
}



