import Mail from '../../lib/Mail';

class MailCancellation {
  get key() {
    return 'MailCancellation';
  }

  async handle({ data }) {
    const { order, deliveryProblem } = data;

    await Mail.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: 'Uma entrega foi cancelada',
      template: 'cancelOrder',
      context: {
        name: order.deliveryman.name,
        recipient: order.recipient.name,
        product: order.product,
        description: deliveryProblem.description,
      },
    });
  }
}


export default new MailCancellation();
