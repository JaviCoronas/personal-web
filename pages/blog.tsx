import { GetStaticProps, NextPage } from "next";
import Card from "../components/Card";
import { IPost } from "../types/post";
import { getAllPosts } from "../utils/mdxUtils";

type Props = {
  posts: [IPost];
};

const Blog: NextPage<Props> = ({ posts }: Props) => {
  console.log(posts)
  return (
    <>
      <div className="flex flex-col items-center mt-5">
        {posts.map((post: IPost) => (
          <Card key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(["title", "slug", "date", "description", "image"]);

  return { props: { posts } };
};
