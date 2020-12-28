import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import { extname } from 'path';

const ENV = process.env.NODE_ENV;
const bucketName =
  ENV && ENV === 'production' ? 'minu-general' : 'minu-development';

class MulterConfig {
  // EVERY IMAGE SENT TO S3 WILL HAVE AN AUTOMATIC THUMBNAIL VERSION, SO WE SEND
  // ONLY THE "FULL" VERSION TO S3 AND ON FRONTEND WE REPLACE "FULL" AS "THUMBNAIL"
  // IN URL IN ORDER TO HAVE THE THUMBNAIL VERSION

  static getCustomerConfig() {
    aws.config.update({ region: 'us-east-2' });

    const s3 = new aws.S3({ apiVersion: '2006-03-01' });

    const storage = multerS3({
      s3,
      bucket: bucketName,
      metadata(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key(req, file, cb) {
        cb(
          null,
          `customers/avatar/${req.customerId}-${Date.now()}-full${extname(
            file.originalname
          )}`
        );
      },
    });

    return { storage };
  }

  static getEstablishmentConfig() {
    aws.config.update({ region: 'us-east-2' });

    const s3 = new aws.S3({ apiVersion: '2006-03-01' });

    const storage = multerS3({
      s3,
      bucket: bucketName,
      metadata(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key(req, file, cb) {
        cb(
          null,
          `establishments/photo/${
            req.establishmentId
          }-${Date.now()}-full${extname(file.originalname)}`
        );
      },
    });

    return { storage };
  }

  static getProductConfig() {
    aws.config.update({ region: 'us-east-2' });

    const s3 = new aws.S3({ apiVersion: '2006-03-01' });

    const storage = multerS3({
      s3,
      bucket: bucketName,
      metadata(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key(req, file, cb) {
        cb(
          null,
          `establishments/products/photo/${
            req.establishmentId
          }-${Date.now()}-full${extname(file.originalname)}`
        );
      },
    });

    return { storage };
  }
}

export default MulterConfig;
