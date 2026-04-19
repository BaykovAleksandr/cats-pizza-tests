export const oneOrder = {
	orders: [{
  id: "order-1",
  ownerType: "user",
  ownerId: "user-8",
  userId: "user-8",
  guestSessionId: null,
  items: [
    {
      id: "cat-3",
      name: "Четыре сыра",
      basePrice: 5100,
      price: 5100,
      options: {
        furType: "Средняя",
        activityLevel: "Игровой",
        extras: [],
      },
      quantity: 1,
    },
  ],
  totalPrice: 5100,
  customer: {
    city: "v",
    street: "v",
    house: "1",
    apartment: "",
    comment: "",
    payment: "card",
  },
  createdAt: "2026-04-19T14:25:45.014Z",}]
};

export const emptyOrders = {
  orders: []
};
