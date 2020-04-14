import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { id } = req.params;
    const { page, q } = req.query;
    const atualPage = page || '1';
    const name = q || '';

    if (id) {
      const deliveryman = await Deliveryman.findByPk(id, {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        ],
      });
      return res.json(deliveryman);
    }

    const deliverymans = await Deliveryman.findAndCountAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
      order: [['name', 'ASC']],
      limit: 4,
      offset: (atualPage - 1) * 4,
    });
    return res.json(deliverymans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confira seus dados.' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists) {
      return res
        .status(400)
        .json({ error: 'Já existe um entregador com este e-mail.' });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confira seus dados.' });
    }

    const { id } = req.params;
    const { email } = req.body;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Este entregador não existe.' });
    }

    if (email !== deliveryman.email) {
      const hasEmail = await Deliveryman.findOne({
        where: { email },
      });

      if (hasEmail) {
        return res
          .status(400)
          .json({ error: 'Já existe um entregador com este e-mail.' });
      }
    }

    await deliveryman.update(req.body);

    const { name, avatar_id } = await Deliveryman.findByPk(id);

    return res.json({
      id,
      name,
      avatar_id,
      email,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Este entregador não existe.' });
    }

    await Deliveryman.destroy({
      where: {
        id,
      },
    });

    return res.json({ success: 'Entregador excluído com sucesso!' });
  }
}

export default new DeliverymanController();
