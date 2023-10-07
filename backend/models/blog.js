import { db } from "../database/database.js";

export function Blogs(blogId, blogDateTime, userId, title, content) {
  return {
    blogId,
    blogDateTime,
    userId,
    title,
    content,
  };
}

export async function getAll() {
  const [allBlogPosts] = await db.query(
    "SELECT * FROM blog_posts ORDER BY blogDateTime DESC"
  );

  return allBlogPosts.map((blogPost) =>
    Blogs(
      blogPost.blogId,
      blogPost.blogDateTime,
      blogPost.userId,
      blogPost.title,
      blogPost.content
    )
  );
}

export async function getByID(blogId) {
  const [allBlogPosts] = await db.query(
    "SELECT * FROM blog_posts WHERE blogId = ?",
    blogId
  );

  if (allBlogPosts.length > 0) {
    const allBlogPost = allBlogPosts[0];
    return Promise.resolve(
      Users(
        allBlogPosts.blogId,
        allBlogPosts.blogDateTime,
        allBlogPosts.userId,
        allBlogPosts.title,
        allBlogPosts.content
      )
    );
  } else {
    return Promise.reject("no results found");
  }
}

export async function create(blog) {
  return db
    .query("INSERT INTO users (userId, title, content) " + "VALUES (?, ?, ?)", [
      blog.userId,
      blog.title,
      blog.content,
    ])
    .then(([result]) => {
      return { ...blog, blogId: result.insertId };
    });
}

export async function update(blog) {
  return db
    .query(
      "UPDATE users SET blog_posts = ?, title = ?, content = ? WHERE blogId = ?",
      [blog.userId, blog.title, blog.content, blog.blogId]
    )
    .then(([result]) => {
      return { ...blog, blogId: result.insertId };
    });
}

export async function deleteById(blogId) {
  return db.query("DELETE FROM blog_posts WHERE blogId = ?", blogId);
}
