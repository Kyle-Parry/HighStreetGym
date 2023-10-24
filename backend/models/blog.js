import { db } from "../database/database.js";

export function Blogs(
  blogId,
  blogDateTime,
  userId,
  title,
  content,
  firstName,
  lastName
) {
  return {
    blogId,
    blogDateTime,
    userId,
    title,
    content,
    firstName,
    lastName,
  };
}

export async function getAll() {
  const [allBlogPosts] = await db.query(
    `
    SELECT blog_posts.*, users.firstName, users.lastName,
           DATE_FORMAT(blog_posts.blogDateTime, '%d/%m/%Y') AS formattedDate 
    FROM blog_posts 
    JOIN users ON blog_posts.userId = users.userId 
    ORDER BY blog_posts.blogDateTime DESC
    `
  );

  return allBlogPosts.map((blogPost) =>
    Blogs(
      blogPost.blogId,
      blogPost.formattedDate,
      blogPost.userId,
      blogPost.title,
      blogPost.content,
      blogPost.firstName,
      blogPost.lastName
    )
  );
}

export async function getByID(blogId) {
  const [allBlogPosts] = await db.query(
    `
    SELECT blog_posts.*, users.firstName, users.lastName,
           DATE_FORMAT(blog_posts.blogDateTime, '%d/%m/%Y') AS formattedDate 
    FROM blog_posts 
    JOIN users ON blog_posts.userId = users.userId 
    WHERE blog_posts.blogId = ?
    `,
    blogId
  );

  if (allBlogPosts.length > 0) {
    const blogPost = allBlogPosts[0];
    return Promise.resolve(
      Blogs(
        blogPost.blogId,
        blogPost.formattedDate,
        blogPost.userId,
        blogPost.title,
        blogPost.content,
        blogPost.firstName,
        blogPost.lastName
      )
    );
  } else {
    return Promise.reject("no results found");
  }
}

export async function create(blog) {
  return db
    .query(
      "INSERT INTO blog_posts (userId, title, content) " + "VALUES (?, ?, ?)",
      [blog.userId, blog.title, blog.content]
    )
    .then(([result]) => {
      return { ...blog, blogId: result.insertId };
    });
}

export async function update(blog) {
  return db
    .query(
      "UPDATE blog_posts SET blog_posts = ?, title = ?, content = ? WHERE blogId = ?",
      [blog.userId, blog.title, blog.content, blog.blogId]
    )
    .then(([result]) => {
      return { ...blog, blogId: result.insertId };
    });
}

export async function deleteById(blogId) {
  return db.query("DELETE FROM blog_posts WHERE blogId = ?", blogId);
}
