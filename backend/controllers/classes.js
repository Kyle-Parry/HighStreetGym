import { Router } from "express";
import * as Classes from "../models/classes.js";

const classController = Router();

classController.get("/", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Get all classes not yet implemented",
  });
});

classController.get("/:id", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Get class by ID not yet implemented",
  });
});

classController.post("/upload/xml", (req, res) => {
  if (req.files && req.files["xml-file"]) {
    // Access the XML file as a string
    const XMLFile = req.files["xml-file"];
    const file_text = XMLFile.data.toString();

    // Set up XML parser
    const parser = new xml2js.Parser();
    parser
      .parseStringPromise(file_text)
      .then((data) => {
        const classUpload = data["class-upload"];
        const classUploadAttributes = classUpload["$"];
        const operation = classUploadAttributes["operation"];
        // Slightly painful indexing to reach nested children
        const classData = classUpload["classs"][0]["class"];

        if (operation == "insert") {
          Promise.all(
            classData.map((classData) => {
              // Convert the xml object into a model object
              const classModel = Class(
                null,
                null,
                classData.locationId.toString(),
                classData.activityId.toString(),
                classData.userId.toString()
              );
              // Return the promise of each creation query
              return create(classModel);
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
            classData.map((classData) => {
              // Convert the xml object into a model object
              const classModel = Users(
                classData.blogId.toString(),
                null,
                classData.locationId.toString(),
                classData.activityId.toString(),
                classData.userId.toString()
              );
              // Return the promise of each creation query
              return update(classModel);
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

classController.post("/delete", (req, res) => {
  res.status(501).json({
    status: 501,
    message: "Delete class not yet implemented",
  });
});

export default classController;
