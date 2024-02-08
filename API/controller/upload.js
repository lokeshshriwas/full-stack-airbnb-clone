const { cloudinary } = require("../cloudinary");

module.exports.uploadByLink = async (req, res) => {
  const { link } = req.body;
  try {
    const response = await cloudinary.uploader.upload(link, {
      folder: "skystay",
    });
    res.json(response.url);
  } catch (error) {
    console.log("error occured in link upload,", error);
  }
};

module.exports.uploadFromDevice = async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path } = req.files[i];
    const response = await cloudinary.uploader.upload(path, {
      folder: "skystay",
    });
    const { url } = response;
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
};

