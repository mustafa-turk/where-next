import { useState } from "react";
import { isEmpty } from "lodash";
import { useMutation } from "react-query";
import { AnimatePresence } from "framer-motion";

import Head from "next/head";
import Header from "@/components/header";
import Banner from "@/components/banner";
import Select from "@/components/select";
import Loader from "@/components/loader";
import MetaTags from "@/components/meta-tags";
import Toast, { toast } from "@/components/toast";
import Footer from "@/components/footer";
import AnimatedSection from "@/components/animated-section";

import { getCountriesByCode } from "@/utils/lookup";
import { fetchSuggestions } from "@/utils/api";
import { ERR_MESSAGE_NOT_FOUND } from "@/utils/constants";

export default function HomePage() {
  const [selectedCountryNames, setSelectedCountryNames] = useState([]);
  const {
    isLoading,
    mutate: generateSuggestions,
    data: suggestions,
    reset,
  } = useMutation(() => fetchSuggestions(selectedCountryNames), {
    onError: () => {
      toast(ERR_MESSAGE_NOT_FOUND);
    },
  });

  function handleFind() {
    if (isEmpty(selectedCountryNames)) {
      return toast("Please select at least one country");
    }
    generateSuggestions();
  }

  function handleReset() {
    reset();
    setSelectedCountryNames([]);
  }

  return (
    <div className='py-4'>
      <Head>
        <title>Where to go Next?</title>
        <MetaTags />
      </Head>

      <Toast />
      <Header />
      <Banner />

      <main className='p-4 max-w-xl mx-auto -mt-14'>
        <AnimatePresence mode='wait'>
          {isEmpty(suggestions) && (
            <AnimatedSection name='initial'>
              <h2 className='font-bold text-xl mb-3 text-white'>
                Where have you already been?
              </h2>
              <Select
                onChange={setSelectedCountryNames}
                isDisabled={isLoading}
              />
              <button
                onClick={handleFind}
                className='button--primary flex justify-center'
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className='flex justify-center gap-1'>
                    Finding Destinations <Loader />
                  </span>
                ) : (
                  "Find Destinations"
                )}
              </button>
            </AnimatedSection>
          )}
          {!isEmpty(suggestions) && (
            <AnimatedSection name='results'>
              <h2 className='font-bold text-xl mb-3 text-white'>
                Our top destinations for you are the following, have fun!
              </h2>
              <div>
                {getCountriesByCode(suggestions).map((suggestion, index) => {
                  if (!suggestion) return null;
                  return (
                    <div
                      key={index}
                      className='bg-neutral-900 text-neutral-300 px-3 py-2 rounded-md my-3'
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
              <button onClick={handleReset} className='button--primary'>
                Find again
              </button>
            </AnimatedSection>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
