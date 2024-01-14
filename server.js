import express from 'express';
import {universityRouter} from "./university.router.js";
import {universitiesRouter} from "./universities.router.js";

const app = new express();
app.use(express.json());

app.use('/university', universityRouter);
app.use('/universities', universitiesRouter);


app.get('/', (req, res) => {
  res.send({
      name: process.env.npm_package_name,
        version: process.env.npm_package_version,
  });
});

app.listen(8080);