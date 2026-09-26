"use client"

import { FormEvent, useState } from "react";

type Post = {
  title: string;
  content: string;
  createdAt: Date;
};

const test_posts: Post[] = [
  {
    title: "Bullshit",
    content: "Lorem ipsum blablabla bullcrap",
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    title: "More Bullshit",
    content: "AAAAAAAAAAAAAAA",
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
  },
];


const PageTest = () => {
  const [posts, setPosts] = useState<Post[]>(test_posts);
  const [text, setText] = useState("");
  const [_title, setTitle] = useState("");

  function submitPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = _title.trim();
    const content = text.trim();

    if (!content || !_title) return;

    const newPost: Post = {
      title,
      content,
      createdAt: new Date(),
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setTitle("");
    setText("");
  }

  return (
    <div className="feed">
      <header className="header">
        <h1>Néant et pesanteur</h1>
      </header>

      <section className="composer">

        <form onSubmit={submitPost} className="composer-form">
          <textarea
            value={_title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            maxLength={100}
            rows={1}
          />

          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Content"
            maxLength={280}
            rows={3}
          />

          <div className="composer-footer">
            <span className={_title.length > 55 ? "warning" : ""}>
              {_title.length}/100
            </span>

            <span className={text.length > 250 ? "warning" : ""}>
              {text.length}/280
            </span>

            <button
              type="submit"
              disabled={!text.trim() || !_title.trim()}
            >
              Post
            </button>
          </div>
        </form>
      </section>

      <section className="posts">
        {posts.map((post) => (
          <article className="post" key={post.createdAt.toUTCString()}>

            <div className="post-content">
              <div className="post-header">
                <strong>{post.title}</strong>
                <span>·</span>
                <span>{post.createdAt.toUTCString()}</span>
              </div>

              <p>{post.content}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default PageTest;
