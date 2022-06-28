import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import Link from "next/link";

interface Post {
  title: string;
  data: string;
  category: string;
  slug: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout title="Blog" seoTitle="Blog">
      <h1 className="text-center font-semibold text-xl my-10 mt-5">
        Latest Posts:
      </h1>
      <ul>
        {posts.map((post, index) => (
          <div key={index} className="mb-5">
            <Link href={`/blog/${post.slug}`}>
              <a>
                <span>{post.title}</span>
                <div className="text-lg text-red-500">
                  <span>
                    {post.data} / {post.category}
                  </span>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </ul>
    </Layout>
  );
};

export async function getStaticProps() {
  // nodeJS 사용하여 blog에 있는 파일들 가져오기
  const blogPosts = readdirSync("./posts").map(file => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    // md 지우기
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug };
  });
  console.log(blogPosts);
  return {
    props: { posts: blogPosts },
  };
}

export default Blog;
