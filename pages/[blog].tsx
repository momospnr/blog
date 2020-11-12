import React from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const CodeBlock = (props: { language: any, value: string }) => {
  return (
    <SyntaxHighlighter showLineNumbers={true} language={props.language}>
      {props.value}
    </SyntaxHighlighter>
  );
};

const Blog = (props: {
  content: string, data: {
    slug: string,
    title: string,
    author: string,
    description: string,
    date: string
  }
}) => {
  const frontmatter = props.data;

  return (
    <>
      <h1>{frontmatter.title}</h1>
      <h3>{frontmatter.description}</h3>
      <ReactMarkdown
        escapeHtml={true}
        source={props.content}
        renderers={{ code: CodeBlock }}
      />
    </>
  );
};

export default Blog;

Blog.getInitialProps = async (context: any) => {
  const { blog } = context.query;
  const content = await import(`../content/${blog}.md`);
  const data = matter(content.default);

  return { ...data };
};