import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
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
              className='p-2 px-4 border-2 bg-red-800 border-red-900 text-red-100 rounded-xl'
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
