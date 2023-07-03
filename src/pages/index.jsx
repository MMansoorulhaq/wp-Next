import Link from 'next/link';

export default function Index({ data }) {
  return (
    <main className="container mx-auto grid grid-cols-3 gap-5">
      {data.map((post) => {
        const featuredMedia = post._embedded['wp:featuredmedia'];
        const sourceUrl = featuredMedia && featuredMedia[0]?.source_url;

        return (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="cursor-pointer p-4 bg-white rounded-lg shadow">
              <img
                className="mb-5 rounded-lg w-full h-60 object-cover"
                src={sourceUrl}
                width={400}
                height={400}
                alt="blog"
              />
              <h3 className="font-medium text-xl mb-3">{post.title.rendered}</h3>
              <div
                className="text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.rendered,
                }}
              />
            </div>
          </Link>
        );
      })}
    </main>
  );
}

export async function getServerSideProps() {
  const getPosts = await fetch('https://c2o.net/wp-json/wp/v2/posts?_embed');
  const data = await getPosts.json();
  return { props: { data } };
}
