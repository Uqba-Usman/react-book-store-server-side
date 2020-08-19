import GenericService from "./GenericService";

class StripeService extends GenericService {
  constructor() {
    super();
  }
  postStripe = (data) => this.post("/api/stripe", data);
}

let stripeService = new StripeService();
export default stripeService;
