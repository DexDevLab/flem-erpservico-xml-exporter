import formidable from "formidable";

const formMiddleWare = (req, res, next) => {
  const form = formidable({
    // multiples: true
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const filesParsed = {};

    Object.keys(files).forEach((key) => {
      if (key.toString().includes("[]")) {
        filesParsed[key.replace("[]", "")] = files[key];
      } else {
        filesParsed[key] = files[key];
      }
    });

    req.fields = fields;
    req.files = filesParsed;
    next();
  });
};

export { formMiddleWare };
