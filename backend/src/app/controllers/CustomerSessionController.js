import jwt from 'jsonwebtoken';
import aws from 'aws-sdk';
import * as Yup from 'yup';

import Customer from '../models/Customer';

import authConfig from '../../config/auth';

class CustomerSessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      phone_number: Yup.string().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos.' });
    }

    const { phone_number } = req.body;

    const customer = await Customer.findOne({
      where: { phone_number },
    });

    if (!customer) {
      return res.status(400).json({
        error:
          'Cliente não registrado. Verifique seus dados e tente novamente.',
      });
    }

    aws.config.update({ region: 'us-east-2' });
    const s3 = new aws.S3({ apiVersion: '2006-03-01' });

    const params = {
      Bucket: 'minu-general',
      Prefix: `customers/avatar/${customer.id}`,
    };

    const imageKey = await new Promise((accept) => {
      s3.listObjects(params, (err, data) => {
        // This function can return many different file extensions, so we order by lastModified
        if (data.Contents.length > 0) {
          const orderedContents = data.Contents.sort((actual, next) => {
            if (actual.LastModified > next.LastModified) {
              return -1;
            }
            return 1;
          });
          accept(orderedContents[0].Key);
        } else {
          accept(null);
        }
      });
    });

    const avatar = imageKey
      ? `https://minu-general.s3.us-east-2.amazonaws.com/${imageKey}`
      : null;

    return res.json({
      customer: {
        id: customer.id,
        name: customer.name,
        lastname: customer.lastname,
        email: customer.email,
        phone_number: customer.phone_number,
        avatar,
      },
      token: jwt.sign(
        { id: customer.id, kind: 'customer' },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        }
      ),
    });
  }
}

export default new CustomerSessionController();
