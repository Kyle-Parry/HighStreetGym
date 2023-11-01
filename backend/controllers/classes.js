import { Router } from "express";
import {
  Classes,
  getAll,
  create,
  update,
  deleteById,
} from "../models/classes.js";
import xml2js from "xml2js";
import auth from "../middleware/auth.js";

const classController = Router();

classController.get("/", auth(["admin", "user"]), async (req, res) => {
  try {
    const gymClasses = await getAll();

    if (gymClasses.length === 0) {
      res.status(404).json({
        status: 404,
        message: "No classes found",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Get all classes",
        gymClasses: gymClasses,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to get classes",
      error: error.message,
    });
  }
});

classController.get("/:id", auth(["admin", "user"]), async (req, res) => {
  const classId = req.params.id;

  try {
    const gymClass = await getByID(classId);

    if (!gymClass) {
      res.status(404).json({
        status: 404,
        message: "class not found",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Get class by ID",
        gymClass: gymClass,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to get gymClass by ID",
    });
  }
});

classController.post("/upload/xml", auth(["admin"]), (req, res) => {
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
        const classData = classUpload["classes"][0]["class"];

        if (operation == "insert") {
          Promise.all(
            classData.map((classData) => {
              // Convert the xml object into a model object
              const classModel = Classes(
                null,
                classData.classDateTime.toString(),
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
              const classModel = Classes(
                classData.classId.toString(),
                classData.classDateTime.toString(),
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

classController.post("/delete", auth(["admin"]), (req, res) => {
  const classId = req.params.id;

  deleteById(classId)
    .then((result) => {
      res.status(200).json({
        status: 200,
        message: "class deleted",
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        message: "Failed to delete class",
      });
    });
});

export default classController;
