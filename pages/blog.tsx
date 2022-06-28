import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";

interface Post {
  title: string;
  data: string;
  category: string;
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
            <span>{post.title}</span>
            <div className="text-lg text-red-500">
              <span>
                {post.data} / {post.category}
              </span>
            </div>
          </div>
        ))}
      </ul>
    </Layout>
  );
};

export async function getStaticProps() {
  const blogPosts = readdirSync("./posts").map(file => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    return matter(content).data;
  });
  console.log(blogPosts);
  return {
    props: { posts: blogPosts },
  };
}

export default Blog;
