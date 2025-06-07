import { request } from "./jest.setup";

describe("Category Controller", () => {
  let userId = null;
  let categoryId = null;
  let token;

  beforeAll(async () => {
    const user = {
      name: "Mohamed",
      email: `mohamed${Date.now()}@email.com`,
      password: "test123"
    };

    await request.post("/auth/register").send(user);
    const res = await request.post("/auth/login").send(user);
    userId = res.body.user._id;
    token = res.body.token;
  });

  it("GET /categories - should return empty array if categories is empty", async () => {
    const res = await request.get("/cart").set({ authorization: `Bearer ${token}` });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("POST /categories - should add new Category", async () => {
    const res = await request.post("/categories").send({
      name: "Category"
    }).set({ authorization: `Bearer ${token}` });

    categoryId = res.body.data._id;
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Category Added Successfully!");
    expect(res.body.data).toHaveProperty("name");
  });

  it("PUT /categories/:categoryId - should update category name", async () => {
    const res = await request.put(`/categories/${categoryId}`).send({
      name: "Category 2"
    }).set({ authorization: `Bearer ${token}` });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Category Updated Successfully!");
  });

  it("DELETE /categories/:categoryId - should delete item from cart", async () => {
    const res = await request.delete(`/categories/${categoryId}`).set({ authorization: `Bearer ${token}` });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Category Deleted Successfully!");
  });
});
