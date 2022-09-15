import Image from "next/image";
import Link from "next/link";
import { IPost } from "../types/post";

type Props = {
  post: IPost;
};

const Card: React.FC<Props> = ({ post }: Props) => {
  return (
    <div
      className="flex w-1/2 m-2 align-middle border rounded shadow-lg"
      key={post.slug}
    >
      <div
        className="w-1/3 overflow-hidden relative"
        style={{ height: "20vh" }}
      >
        <Image layout="fill" objectFit="cover" src={post.image}></Image>
      </div>
      <div className="flex-1 ml-5">
        <h2 className="text-2xl mt-5 font-bold">
          <Link href={`/posts/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </h2>
        <p className="mt-3">{post.description}</p>
      </div>
    </div>
  );
};

export default Card;
