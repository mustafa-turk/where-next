import { motion } from "framer-motion";

type Props = {
  children: JSX.Element | JSX.Element[];
};

function AnimatedSection({ children }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='mt-10'
    >
      {children}
    </motion.section>
  );
}

export default AnimatedSection;
