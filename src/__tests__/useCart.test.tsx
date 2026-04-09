import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { MenuItem } from "../types/menu";
import { useCart } from "../hooks/useCart";

function TestCartHarness({ item }: { item: MenuItem }) {
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <div>
      <button onClick={() => addToCart(item)}>add</button>
      <button onClick={() => addToCart(item, 2)}>add2</button>
      <button onClick={() => updateQuantity(item.id, 3)}>set3</button>
      <button onClick={() => removeFromCart(item.id)}>remove</button>
      <button onClick={() => clearCart()}>clear</button>
      <div data-testid="items">{totalItems}</div>
      <div data-testid="price">{totalPrice}</div>
      <div data-testid="count">
        {cart.find((i) => i.id === item.id)?.quantity ?? 0}
      </div>
    </div>
  );
}

const sampleItem: MenuItem = {
  id: 999,
  name: "Test Dish",
  description: "Test",
  price: 10,
  currency: "EUR",
  isFeatured: false,
  tags: [],
  imageUrl: "about:blank",
};

describe("useCart", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds items and tracks totals", async () => {
    const user = userEvent.setup();
    render(<TestCartHarness item={sampleItem} />);
    expect(screen.getByTestId("items").textContent).toBe("0");
    expect(screen.getByTestId("price").textContent).toBe("0");

    await user.click(screen.getByText("add"));
    expect(screen.getByTestId("items").textContent).toBe("1");
    expect(screen.getByTestId("price").textContent).toBe("10");
    expect(screen.getByTestId("count").textContent).toBe("1");

    await user.click(screen.getByText("add2"));
    expect(screen.getByTestId("items").textContent).toBe("3");
    expect(screen.getByTestId("price").textContent).toBe("30");
    expect(screen.getByTestId("count").textContent).toBe("3");
  });

  it("updates quantity and removes items", async () => {
    const user = userEvent.setup();
    render(<TestCartHarness item={sampleItem} />);
    await user.click(screen.getByText("add2"));
    expect(screen.getByTestId("count").textContent).toBe("2");

    await user.click(screen.getByText("set3"));
    expect(screen.getByTestId("count").textContent).toBe("3");
    expect(screen.getByTestId("price").textContent).toBe("30");

    await user.click(screen.getByText("remove"));
    expect(screen.getByTestId("count").textContent).toBe("0");
    expect(screen.getByTestId("items").textContent).toBe("0");
    expect(screen.getByTestId("price").textContent).toBe("0");
  });

  it("persists to localStorage", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<TestCartHarness item={sampleItem} />);
    await user.click(screen.getByText("add"));
    expect(screen.getByTestId("count").textContent).toBe("1");
    unmount();
    render(<TestCartHarness item={sampleItem} />);
    // Hook should rehydrate from localStorage
    expect(screen.getByTestId("count").textContent).toBe("1");
  });
});
