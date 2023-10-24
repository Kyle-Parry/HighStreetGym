import { Router } from "express";
import {
  Blogs,
  create,
  update,
  getAll,
  getByID,
  deleteById,
} from "../models/blog.js";
import xml2js from "xml2js";
import auth from "../middleware/auth.js";

const blogController = Router();

blogController.get("/", auth(["admin", "user"]), async (req, res) => {
  try {
    const blogPosts = await getAll();

    if (blogPosts.length === 0) {
      res.status(404).json({
        status: 404,
        message: "No blog posts found",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Get all blog posts",
        blogPosts: blogPosts,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to get blog posts" + error,
    });
  }
});

blogController.get("/:id", auth(["admin", "user"]), async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await getByID(blogId);

    if (!blog) {
      res.status(404).json({
        status: 404,
        message: "Blog not found",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Get blog by ID",
        blog: blog,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to get blog by ID",
    });
  }
});

blogController.post("/upload/xml", auth(["admin"]), (req, res) => {
  console.log(req.files);
  if (req.files && req.files["xml-file"]) {
    // Access the XML file as a string
    const XMLFile = req.files["xml-file"];
    const file_text = XMLFile.data.toString();
    // Set up XML parser
    const parser = new xml2js.Parser();
    parser
      .parseStringPromise(file_text)
      .then((data) => {
        const blogUpload = data["blog-upload"];
        const blogUploadAttributes = blogUpload["$"];
        const operation = blogUploadAttributes["operation"];
        // Slightly painful indexing to reach nested children
        const blogData = blogUpload["blogs"][0]["blog"];
        if (operation === "insert") {
          Promise.all(
            blogData.map((blogData) => {
              // Convert the xml object into a model object
              const blogModel = Blogs(
                null,
                null,
                blogData.userId.toString(),
                blogData.title.toString(),
                blogData.content.toString()
              );
              // Return the promise of each creation query
              return create(blogModel);
            })
          )
            .then((results) => {
              res.status(200).json({
                status: 200,
                message: "XML Upload insert successful",
              });
            })
            .catch((error) => {
              res.status(500).json({
                status: 500,
                message: "XML upload failed on database operation - " + error,
              });
            });
        } else if (operation == "update") {
          Promise.all(
            blogData.map((blogData) => {
              // Convert the xml object into a model object
              const blogModel = Blogs(
                blogData.blogId.toString(),
                null,
                blogData.userId.toString(),
                blogData.title.toString(),
                blogData.content.toString()
              );
              // Return the promise of each creation query
              return update(blogModel);
            })
          )
            .then((results) => {
              res.status(200).json({
                status: 200,
                message: "XML Upload update successful",
              });
            })
            .catch((error) => {
              res.status(500).json({
                status: 500,
                message: "XML upload failed on database operation - " + error,
              });
            });
        } else {
          res.status(400).json({
            status: 400,
            message: "XML Contains invalid operation attribute value",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Error parsing XML - " + error,
        });
      });
  } else {
    res.status(400).json({
      status: 400,
      message: "No file selected",
    });
  }
});

blogController.post("/delete", auth(["admin"]), (req, res) => {
  const blogId = req.params.id;

  deleteById(blogId)
    .then((result) => {
      res.status(200).json({
        status: 200,
        message: "Blog deleted",
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        message: "Failed to delete blog",
      });
    });
});

export default blogController;
