exports.createAccountForm = (req, res) => {
  res.render("createAccount", {
    pageName: "Create an account in UpTask",
  });
};
