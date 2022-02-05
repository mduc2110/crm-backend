import path from "path";
console.log(__dirname);
module.exports = {
   alias: {
      Address: path.resolve(__dirname, "./src/static/address/"),
      // Templates: path.resolve(__dirname, 'src/templates/'),
   },
};
