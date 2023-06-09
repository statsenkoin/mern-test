const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    //   const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  //   return func;
};

export default ctrlWrapper;
