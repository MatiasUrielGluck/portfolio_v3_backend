module.exports = {
  download: async (req, res) => {
    const { fileName } = req.params;

    const filePath = `${process.cwd()}/assets/downloads/${fileName}`;
    console.log(filePath);
    res.download(filePath, "MatiasUrielGluck-CV.pdf", (err) => {
      console.log(err);
    });
  },
};
