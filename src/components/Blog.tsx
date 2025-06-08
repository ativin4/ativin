export default function BlogPost({ params }: { params: { slug: string } }) {
  // Fetch and render your blog post here
  return (
    <div>
      <h1>Blog Post: {params.slug}</h1>
    </div>
  );
}
