import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EmptyState from "@/components/EmptyState";

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(
      <EmptyState
        title="No timetable items yet"
        description="Create items when they can persist to your account."
      />
    );

    expect(
      screen.getByRole("heading", { name: "No timetable items yet" })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Create items when they can persist to your account.")
    ).toBeInTheDocument();
  });
});
