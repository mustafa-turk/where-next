import dynamic from "next/dynamic";
import { times } from "lodash";

import { getRandomCountries } from "@/utils/lookup";
import { memo } from "react";

function Header() {
  return (
    <header className='relative w-full overflow-hidden -z-10'>
      <div className='mb-8 '>
        <h1 className='font-black text-4xl text-center text-white'>
          Where next?
        </h1>
        <p className='text-lg text-neutral-400 text-center'>
          Let our AI pick top destinations for you!
        </p>
      </div>
      <div className='w-full absolute inset-0 bg-gradient-to-t via-black/60 from-black to-transparent' />
      <div className='whitespace-nowrap animate-move'>
        {times(3, () => (
          <div className='flex gap-3 my-3'>
            {getRandomCountries().map((c) => {
              const label = `${c.emoji} ${c.name}`;
              return (
                <span
                  key={c.name}
                  className='bg-neutral-900 px-3 py-2 rounded-xl text-white'
                >
                  {label}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </header>
  );
}

export default dynamic(() => Promise.resolve(memo(Header)), {
  ssr: false,
});
