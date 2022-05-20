import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const port = process.env.PORT || 7010;
let __serverPath = fileURLToPath(import.meta.url);

const instance = express();

instance.use(
  express.static(
    path.join(__serverPath, "./../../../node_modules/bootstrap/dist/css")
  )
);

instance.use(
  express.static(path.join(__serverPath, "./../../../node_modules/jquery/dist"))
);

instance.use(express.static(path.join(__serverPath, "./../../views")));

const router = express.Router();
instance.use(router);

router.get("/", (req, resp) => {
  resp.sendFile("index.html", {
    root: path.join(__serverPath, "./../../views"), // root is a server root
  });
});

router.get("/home", (req, resp) => {
  resp.sendFile("home.html", {
    root: path.join(__serverPath, "./../../views"), // root is a server root
  });
});

router.get("/contact", (req, resp) => {
  resp.sendFile("contact.html", {
    root: path.join(__serverPath, "./../../views"), // root is a server root
  });
});

router.get("/about", (req, resp) => {
  resp.sendFile("about.html", {
    root: path.join(__serverPath, "./../../views"), // root is a server root
  });
});

instance.listen(port, () => {
  console.log("====================================");
  console.log(`Server Started on port ${port}`);
  console.log("====================================");
});
