import { useState } from "react";
import { isEmpty } from "lodash";
import { useMutation } from "react-query";
import { lookup } from "@/utils/lookup";
import { motion, AnimatePresence } from "framer-motion";
import { generateSuggestions } from "@/utils/api";

import Head from "next/head";
import Header from "@/components/header";
import Select from "@/components/select";

export default function HomePage() {
  const [selected, setSelected] = useState([]);
  const {
    isLoading,
    mutate: generate,
    data: suggestions,
    reset,
  } = useMutation(() => generateSuggestions(selected));

  return (
    <div className='py-10'>
      <Head>
        <title>Where to go Next?</title>
      </Head>

      <Header />
      <main className='p-4 max-w-xl mx-auto -mt-14'>
        <AnimatePresence>
          {!isLoading && isEmpty(suggestions) && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='mt-10'
            >
              <h2 className='font-bold text-xl mb-3'>
                Where have you already been?
              </h2>
              <Select onChange={setSelected} />
              <button onClick={() => generate()} className='button--primary'>
                {isLoading ? "Loading..." : "Find"}
              </button>

              <p className='text-center mt-3 text-neutral-500'>
                OpenAI will find the best next countries based on your
                selections.
              </p>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isLoading && !isEmpty(suggestions) && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='mt-10'
            >
              <h2 className='font-bold text-xl mb-3'>
                Our top destinations for you are the following, have fun!
              </h2>
              <div>
                {lookup(suggestions).map((suggestion, index) => {
                  if (!suggestion) return null;
                  return (
                    <div
                      key={index}
                      className='bg-neutral-100 px-3 py-2 rounded-xl my-3'
                    >
                      <span>{`${suggestion.emoji} ${suggestion.name}`}</span>
                      <a
                        className='block mt-1 text-neutral-500'
                        target='_blank'
                        href={suggestion.url}
                        rel='noreferrer'
                      >
                        Ready more on Wikipedia &rarr;
                      </a>
                    </div>
                  );
                })}
              </div>
              <button onClick={reset} className='button--primary'>
                Find again
              </button>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
