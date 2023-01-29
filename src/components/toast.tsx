import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { resolveValue, toast, Toaster } from "react-hot-toast";

function Toast() {
  return (
    <Toaster>
      {(t) => (
        <AnimatePresence>
          {t.visible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='p-2 px-4 bg-red-800 border border-red-700 text-red-100 rounded-md shadow-lg'
            >
              <p>{resolveValue(t.message, t)}</p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Toaster>
  );
}

export default dynamic(() => Promise.resolve(Toast), {
  ssr: false,
});

export { toast };