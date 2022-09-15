import md from "markdown-it";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";

import { IPost } from "../../types/post";
import { getPost, getAllPosts } from "../../utils/mdxUtils";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";

// props type
type Props = {
  source: string;
  frontMatter: Omit<IPost, "slug">;
};

const PostPage: NextPage<Props> = ({ source, frontMatter }: Props) => {
  return (
    <div>
      <div
        className=" overflow-hidden relative"
        style={{ height: "30vh", width: "100vw" }}
      >
        <Image layout="fill" objectFit="cover" src={frontMatter.image}></Image>
      </div>
      <article className="m-10 prose prose-green">
        <div dangerouslySetInnerHTML={{ __html: md().render(source) }} />
      </article>
    </div>
  );
};

export default PostPage;

interface Iparams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Iparams;
  const { content, data } = getPost(slug);

  return {
    props: {
      source: content,
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getAllPosts(["slug"]);
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
