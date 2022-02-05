import multer from "multer";

const excelFilter = (req, file, cb) => {
   if (file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml")) {
      cb(null, true);
   } else {
      cb("Please upload only excel file.", false);
   }
};

var storage = multer.diskStorage({
   destination: (req, file, cb) => {
      // cb(null, __basedir + "./resources/assets/uploads/");
      // console.log(__dirname + "/src/static/uploads/exelFiles");
      cb(null, "./src/static/uploads/excelFiles");
   },
   filename: (req, file, cb) => {
      cb(null, `${Date.now()}-app-${file.originalname}`);
   },
});

var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
export default uploadFile;
