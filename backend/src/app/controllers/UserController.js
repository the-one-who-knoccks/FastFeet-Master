import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confira seus dados.' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res
        .status(400)
        .json({ error: 'Endereço de e-mail já cadastrado.' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();
