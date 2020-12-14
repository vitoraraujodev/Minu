import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import { extname } from 'path';

class MulterConfig {
  static getCustomerConfig() {
    aws.config.update({ region: 'us-east-2' });

    const s3 = new aws.S3({ apiVersion: '2006-03-01' });

    const storage = multerS3({
      s3,
      bucket: 'minu-general',
      metadata(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key(req, file, cb) {
        cb(
          null,
          `customers/avatar/${req.customerId + extname(file.originalname)}`
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
      bucket: 'minu-general',
      metadata(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key(req, file, cb) {
        cb(
          null,
          `establishments/photo/${
            req.establishmentId + extname(file.originalname)
          }`
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
      bucket: 'minu-general',
      metadata(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key(req, file, cb) {
        cb(
          null,
          `establishments/products/photo/${
            req.params.id + extname(file.originalname)
          }`
        );
      },
    });

    return { storage };
  }
}

export default MulterConfig;
