import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, afterEach } from "vitest";
import MotionButton from "@/components/MotionButton";

afterEach(() => {
  // Keep each test independent.
});

describe("MotionButton", () => {
  it("renders the idle state", () => {
    render(<MotionButton />);

    expect(
      screen.getByRole("button", { name: "Send message" })
    ).toBeInTheDocument();
  });

  it("shows loading state after clicking", async () => {
    const user = userEvent.setup();

    render(<MotionButton forceResult="success" />);

    const button = screen.getByRole("button", {
      name: "Send message",
    });

    await user.click(button);

    expect(button).toHaveTextContent("Sending...");
    expect(button).toBeDisabled();
  });

  it("shows success state after the async operation", async () => {
    const user = userEvent.setup();

    render(
      <MotionButton
        forceResult="success"
      />
    );

    const button = screen.getByRole("button", {
      name: "Send message",
    });

    await user.click(button);

    const successButton = await screen.findByRole(
      "button",
      { name: /Sent!/i },
      { timeout: 3000 }
    );

    expect(successButton).toBeInTheDocument();
  });

  it("shows error state when the operation fails", async () => {
    const user = userEvent.setup();

    render(
      <MotionButton
        forceResult="error"
      />
    );

    const button = screen.getByRole("button", {
      name: "Send message",
    });

    await user.click(button);

    const errorButton = await screen.findByRole(
      "button",
      { name: /Try again/i },
      { timeout: 3000 }
    );

    expect(errorButton).toBeInTheDocument();
  });

  it("does not allow another click while loading", async () => {
    const user = userEvent.setup();

    render(<MotionButton forceResult="success" />);

    const button = screen.getByRole("button", {
      name: "Send message",
    });

    await user.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Sending...");
  });

  it("supports keyboard activation", async () => {
    const user = userEvent.setup();

    render(<MotionButton forceResult="success" />);

    const button = screen.getByRole("button", {
      name: "Send message",
    });

    button.focus();

    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Sending...");
  });
});