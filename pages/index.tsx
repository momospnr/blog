import { GetStaticProps } from "next";
import React from "react";
import Head from "next/head";
import matter from 'gray-matter';
import Link from 'next/link';

const Index = (props: { data:any, title: string; description: string;}) => {
  const realData = props.data.map((blog: any) => matter(blog));
  const listItems = realData.map((listItem: any) => listItem.data);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={props.description}></meta>
        <title>{props.title}</title>
      </Head>
      <h1>My First Blog ✍ </h1>
      <div>
        <ul>
          {listItems.map((blog:any, i:number) => (
            <li key={i}>
              <Link href={`/${blog.slug}`}>
                <a>{blog.title}</a>
              </Link>
                <p>{blog.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Index;

export const getStaticProps:GetStaticProps = async () => {
  const siteData = await import(`../config.json`);
  const fs = require("fs");

  const files = fs.readdirSync(`${process.cwd()}/content`, "utf-8");
  const blogs = files.filter((fn:any) => fn.endsWith(".md"));

  const data = blogs.map((blog: string) => {
    const path = `${process.cwd()}/content/${blog}`;
    const rawContent = fs.readFileSync(path, {
      encoding: "utf-8"
    });

    return rawContent;
  });

  return {
    props: {
      data,
      title: siteData.default.title,
      description: siteData.default.description,
    },
  };
}