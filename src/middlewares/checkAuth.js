export const auth = {
   userAuth: (req, res, next) => {
      console.log(req.user);
      next();
   },
};
