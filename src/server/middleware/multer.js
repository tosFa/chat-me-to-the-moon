import multer from 'multer';
import environmentConfig from '../../../config/private/environment';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, environmentConfig.uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});

export default multer({ storage: storage });