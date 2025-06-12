import React from "react";
import { CardCharacter } from "./CardCharacter";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { motion } from "framer-motion";

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
  const setObserver = useIntersectionObserver(fetchMore);

  const showSkeleton = useDelayedLoading(state.isLoading, 800);

  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <motion.ul
      variants={containerVariant}
      initial="hidden"
      animate="show"
      className="grid gap-x-2 gap-y-4 sm:max-w-[96rem] sm:grid-cols-2 md:grid-cols-3
    lg:grid-cols-4"
    >
      {data?.map((character, idx) => {
        const isTheLastOne = data.length - 1 === idx;
        if (isTheLastOne) {
          return (
            <motion.li
              key={character.id}
              variants={itemVariant}
              ref={setObserver}
            >
              {showSkeleton ? (
                <div className="h-20 w-[18rem] rounded-md bg-gray-800"></div>
              ) : (
                <CardCharacter data={character} />
              )}
            </motion.li>
          );
        }
        return (
          <motion.li key={character.id} variants={itemVariant}>
            {showSkeleton ? (
              <div className="h-[25rem] w-[18rem] rounded-md bg-gray-800"></div>
            ) : (
              <CardCharacter data={character} />
            )}
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
