import grid from 'gridfs-stream';//image is dtored in chunks in DB to prcess that this pakg//multer 1.4.4
import mongoose from 'mongoose';//get image from mongo


const url = 'http://localhost:8080';
/*
let gfs, gridfsBucket;
const conn = mongoose.connection;//check if we are connctd to mongo
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});

export const UploadImage = (req, res) => {
    console.log("in upload image");
    if(!req.file) {
        console.log("in upload kjiojoimage");
        return res.status(404).json("File not found");
    }
    console.log("in upload image2");
    const imageUrl = `${url}/file/${req.file.filename}`;//namd passed from frontend
    res.status(200).json(imageUrl);    //file already uploaded by middlware    
}


//this function get images from Db
export const FetchImage = async (req, res) => {
    try {   
        const file = await gfs.files.findOne({ filename: req.params.filename });
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(response);
        console.log("Here in upload image")
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

*/
const conn = mongoose.connection;
let gfs, gridfsBucket;
conn.once('open', () => {
  gridfsBucket = grid(conn.db, mongoose.mongo);
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('fs');
});

// Function to handle image upload
export const UploadImage = (req, res) => {
  console.log('in upload image');
  if (!req.file) {
    console.log('in upload image - no file');
    return res.status(404).json({ msg: 'File not found' });
  }
  console.log('in upload image - file found');
  const imageUrl = `${url}/file/${req.file.filename}`;
  res.status(200).json(imageUrl);
};

// Function to handle image fetch
export const FetchImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file) {
      return res.status(404).json({ msg: 'File not found' });
    }
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};