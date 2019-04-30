const express = require("express");
const morgan = require("morgan");

const blogPostsRouter = require("./blogPostsRouter");
const app = express();

app.use(morgan("common"));
app.use(express.json());

app.use("/blog-posts", blogPostsRouter);


// declaring server here so that both runServer and closeServer functions can access it
let server;

// runServer function - this starts the server
function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      })
      .on("error", err => {
        reject(err);
      });
  });
}

// closeServer function
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log("Closing server");
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

  