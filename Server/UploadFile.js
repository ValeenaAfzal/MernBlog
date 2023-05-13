//import multer from 'multer';
//import { GridFsStorage } from 'multer-gridfs-storage';// can be used to upload files in mongo db
/*
//middle ware for file upload
const UploadFile = new GridFsStorage({

    url: 'mongodb://valeena:160250@ac-3qpaw8x-shard-00-00.wgwbi04.mongodb.net:27017,ac-3qpaw8x-shard-00-01.wgwbi04.mongodb.net:27017,ac-3qpaw8x-shard-00-02.wgwbi04.mongodb.net:27017/?ssl=true&replicaSet=atlas-bbtllz-shard-0&authSource=admin&retryWrites=true&w=majority',
    options: { useNewUrlParser: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpg"];
        if(match.indexOf(file.memeType) === -1) //extenion of file if -1 doesnot exists else index
        return (`${Date.now()}-blog-${file.originalname}`)//concatinTIng name with miliseconds to avoid duplicaion of images name
        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`,
        }
    }
});

export default multer({UploadFile}); //middle ware uploaded image in mongo db
*/
// Middleware for file upload
/*const UploadFile = new GridFsStorage({
    url: 'mongodb://valeena:160250@ac-3qpaw8x-shard-00-00.wgwbi04.mongodb.net:27017,ac-3qpaw8x-shard-00-01.wgwbi04.mongodb.net:27017,ac-3qpaw8x-shard-00-02.wgwbi04.mongodb.net:27017/?ssl=true&replicaSet=atlas-bbtllz-shard-0&authSource=admin&retryWrites=true&w=majority',
    options: { useNewUrlParser: true },
    file: (req, file) => {
      const match = ['image/png', 'image/jpg'];
      if (match.indexOf(file.mimetype) === -1) {
        return `${Date.now()}-blog-${file.originalname}`;
      }
      return {
        bucketName: 'photos',
        filename: `${Date.now()}-blog-${file.originalname}`,
      };
    },
  });
  
  export default multer({ storage: UploadFile });*/

/*
  const storage = new GridFsStorage({
    url: 'mongodb://valeena:160250@ac-3qpaw8x-shard-00-00.wgwbi04.mongodb.net:27017,ac-3qpaw8x-shard-00-01.wgwbi04.mongodb.net:27017,ac-3qpaw8x-shard-00-02.wgwbi04.mongodb.net:27017/?ssl=true&replicaSet=atlas-bbtllz-shard-0&authSource=admin&retryWrites=true&w=majority',
    
   // url: 'mongodb://localhost:27017/myblog',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const filename = `image-${Date.now()}${path.extname(file.originalname)}`;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    }
  });
  
  export default  multer({ storage });*/

import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import mongoose from 'mongoose';

const storage = new GridFsStorage({
  url: 'mongodb://valeena:160250@ac-3qpaw8x-shard-00-00.wgwbi04.mongodb.net:27017,ac-3qpaw8x-shard-00-01.wgwbi04.mongodb.net:27017,ac-3qpaw8x-shard-00-02.wgwbi04.mongodb.net:27017/?ssl=true&replicaSet=atlas-bbtllz-shard-0&authSource=admin&retryWrites=true&w=majority',
  options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.mimeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export const UploadFile = multer({storage});