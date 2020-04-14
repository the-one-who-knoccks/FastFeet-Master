import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

class RecipientController {
  async index(req, res) {
    const { id } = req.params;
    const { page, q } = req.query;
    const atualPage = page || '1';
    const name = q || '';

    if (id) {
      const recipient = await Recipient.findByPk(id);
      return res.json(recipient);
    }

    const recipients = await Recipient.findAndCountAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      order: [['name', 'ASC']],
      limit: 5,
      offset: (atualPage - 1) * 5,
    });
    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confira seus dados.' });
    }

    const {
      id,
      name,
      street,
      complement,
      state,
      city,
      cep,
    } = await Recipient.create(req.body);

    return res.json({ id, name, street, complement, state, city, cep });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      cep: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confira seus dados.' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Este destinatário não existe' });
    }

    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Este destinatário não existe' });
    }

    const hasOrder = await Order.findOne({
      where: {
        recipient_id: id,
      },
    });

    if (hasOrder) {
      return res.status(400).json({
        error: 'Este destinatário possui encomendas, não é possível excluir.',
      });
    }

    await Recipient.destroy({
      where: {
        id,
      },
    });

    return res.json({ success: 'Destinatário foi excluído com sucesso!' });
  }
}

export default new RecipientController();
