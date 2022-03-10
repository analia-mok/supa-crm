import { stripe } from '../utils/stripe';
import { useUser } from '../context/user';
import axios from 'axios';
import { Plan } from '../lib/types';

interface PricingPageProps {
  plans: Plan[]
}

const Pricing = (props: PricingPageProps) => {
  const { plans } = props;
  const { user, login, isLoading } = useUser();

  const processSubscription = (planId: string) => async () => {
    const { data } = await axios.get(`/api/subscription/${planId}`);
    console.log(data);
  };

  const showSubscribeButton = !!user && !user.is_subscribed;
  const showCreateAccountButton = !user;
  const showManageSubscriptionButton = !!user && user.is_subscribed;

  return (
    <article>
      <header className="container mx-auto mt-12 mb-10 px-4">
        <h1 className="text-3xl font-bold">Pricing</h1>
      </header>
      <div className="container mx-auto flex justify-center">
        {plans.map(plan => (
          <div key={plan.id} className="flex-1 px-8 py-4 mx-4 border-2 border-gray-300">
            <h2 className="text-xl mb-2">{plan.name}</h2>
            <p>${plan.price / 100} {plan.currency.toUpperCase()} / {plan.interval}</p>
            {
              !isLoading && (
                <div>
                  {showSubscribeButton && <button onClick={processSubscription(plan.id)}>Subscribe</button>}
                  {showCreateAccountButton && <button onClick={login}>Create Account</button>}
                  {showManageSubscriptionButton && <button>Manage Subscription</button>}
                </div>
              )
            }
          </div>
        ))}
      </div>
    </article>
  );
}

export const getStaticProps =  async () => {
  const { data: prices } = await stripe.prices.list();

  const plans = await Promise.all(prices.map(async (price) => {
    const product = await stripe.products.retrieve(price.product.toString());

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
