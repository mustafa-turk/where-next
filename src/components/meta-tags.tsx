const title = "Where next?";
const description = "AI will pick the top destinations for you!";
const imgUrl = "https://www.wherenext.app/og.jpg";

export default function MetaTags() {
  return (
    <>
      <meta name='description' content={description} key='desc' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imgUrl} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={imgUrl} />
      <meta name='twitter:card' content='summary_large_image' />
    </>
  );
}
