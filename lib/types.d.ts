export interface Profile {
  id: string,
  is_subscribed: boolean,
  interval?: string,
  stripe_customer?: string,
  email: string
}

export interface Organization {
  id: string,
  name: string,
  email?: string,
  phone?: string,
  address1?: string,
  address2?: string,
  city?: string,
  state?: string,
  postal_code?: string,
}

export interface Plan {
  id: string
  name: string
  price: number
  interval: string
  currency: string
}
