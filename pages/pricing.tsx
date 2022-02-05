import Stripe from "stripe";

const Pricing = ({ plans }) => {
  return (
    <article>
      <h1 className="text-3xl font-bold">Pricing</h1>
      <div className="container mx-auto flex justify-center">
        {plans.map(plan => (
          <div key={plan.id} className="flex-1 px-8 py-4 border-2 border-gray-300">
            <h2 className="text-xl mb-2">{plan.name}</h2>
            <p>${plan.price / 100} {plan.currency.toUpperCase()} / {plan.interval}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export const getStaticProps =  async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'analia-mok/supa-crm',
      url: 'github.com/analia-mok/supa-crm'
    },
    typescript: true
  });

  const { data: prices } = await stripe.prices.list();

  const plans = await Promise.all(prices.map(async (price) => {
    const product = await stripe.products.retrieve(price.product.toString());
    console.log(price);

    return {
      id: product.id,
      name: product.name,
      price: price.unit_amount || 0,
      interval: price.recurring?.interval,
      currency: price.currency
    };
  }));

  const sortedPlans = plans.sort((a, b) => a.price - b.price);

  return {
    props: {
      plans: sortedPlans
    }
  };
}

export default Pricing;
