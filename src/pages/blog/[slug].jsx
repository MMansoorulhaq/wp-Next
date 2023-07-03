import { useRouter } from 'next/router';

export default function Slug({ data }) {
  const router = useRouter();
  const today = new Date(data.date).toLocaleString();
  const featuredMedia = data._embedded['wp:featuredmedia'];
  const sourceUrl = featuredMedia && featuredMedia[0]?.source_url;

  return (
    <div className="max-w-6xl mx-auto py-20 md:px-8">
      <div>
        <img
          className="mb-5 rounded-2xl w-full h-60 object-cover"
          src={sourceUrl}
          alt="blog"
        />
        <h3 className="font-medium mb-3 text-xl">{data.title.rendered}</h3>
        <div className="text-gray-600">Published On: {today}</div>
        <div
          className="text-gray-600"
          dangerouslySetInnerHTML={{
            __html: data.content.rendered,
          }}
        ></div>
      </div>
      <button className="mt-5 text-blue-500" onClick={() => router.back()}>
        Go Back
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const getPost = await fetch(
    `https://c2o.net/wp-json/wp/v2/posts?_embed&slug=${slug}`
  );
  const [data] = await getPost.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { data } };
}
