import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';
import grid from 'gridfs-stream';
const conn = mongoose.connection;
let gfs, gridfsBucket;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});
const url = 'http://localhost:8080';
export const UploadImage = (request, response) => {
  console.log("here in upload image");
    if(!request.file) 
        return response.status(404).json("File not found");
    const imageUrl = `${url}/file/${request.file.filename}`;//namd passed from frontend
    response.status(200).json(imageUrl);    //file already uploaded by middlware  
}
export const getImage = async (request, response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}