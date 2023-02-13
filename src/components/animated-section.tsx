import { motion } from "framer-motion";

type Props = {
  children: JSX.Element | JSX.Element[];
  name: string;
};

function AnimatedSection({ children, name }: Props) {
  return (
    <motion.section
      key={name}
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
