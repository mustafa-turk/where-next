import { GithubIcon } from "./icon";

function Header() {
  return (
    <header className='mb-8 flex flex-col items-center'>
      <a
        className='block mt-1 text-neutral-500'
        href='https://github.com/mustafa-turk/where-next'
        target='_blank'
        rel='noreferrer'
      >
        <button
          className='button--primary w-auto text-sm mb-3 flex items-center gap-2'
          onClick={console.log}
        >
          <GithubIcon />
          Star on GitHub
        </button>
      </a>
      <h1 className='font-black text-4xl text-white'>Where next?</h1>
      <p className='text-lg text-neutral-400'>
        AI will pick the top destinations for you!
      </p>
    </header>
  );
}

export default Header;
