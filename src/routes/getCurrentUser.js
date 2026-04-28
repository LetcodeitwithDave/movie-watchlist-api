const getCurrenUser = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: req.user,
  });
};

export { getCurrenUser };
