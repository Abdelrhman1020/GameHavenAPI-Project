// tests/cart.test.js
import { request } from "./jest.setup.js";
import { Game } from "../services/category.service.js";

describe("Cart API", () => {
  let userId = null;
  let gameId = null;
  let token = null;

  beforeAll(async () => {
    const game = await Game.create({ name: "Test Game", price: 100, stock: 10 });
    gameId = game._id;

    const user = {
      name: "Mohamed",
      email: `mohamed${Date.now()}@email.com`,
      password: "test123",
    };

    await request.post("/auth/register").send(user);
    const loginRes = await request.post("/auth/login").send(user);
    userId = loginRes.body.user._id;
    token = loginRes.body.token;
  });

  it("GET /cart - should return empty array if cart is empty", async () => {
    const res = await request.get("/cart").set("authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data).toHaveLength(0);
  });

  it("POST /cart - should add item to cart", async () => {
    const res = await request
      .post("/cart")
      .send({ gameId, quantity: 2 })
      .set("authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Game Added to Cart");
    expect(res.body.data.items).toHaveLength(1);
  });

  it("PUT /cart/:gameId - should update cart item quantity", async () => {
    const res = await request
      .put(`/cart/${gameId}`)
      .send({ quantity: 5 })
      .set("authorization", `Bearer ${token}`);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Game Updated in Cart");
  });

  it("DELETE /cart/:gameId - should delete item from cart", async () => {
    const res = await request
      .delete(`/cart/${gameId}`)
      .set("authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Game Deleted from Cart");
  });
});
