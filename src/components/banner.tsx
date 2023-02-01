import { times } from "lodash";
import { getRandomCountries } from "@/utils/lookup";
import { memo } from "react";
import dynamic from "next/dynamic";

function Banner() {
  return (
    <div className='relative w-full overflow-hidden -z-10'>
      <div className='w-full absolute inset-0 bg-gradient-to-t via-black/60 from-black to-transparent' />
      <div className='whitespace-nowrap animate-move'>
        {times(3, (index) => (
          <div className='flex gap-3 my-3' key={index}>
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
    </div>
  );
}

export default dynamic(() => Promise.resolve(memo(Banner)), {
  ssr: false,
});
