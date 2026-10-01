import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DsaProgressResult from "@/components/DsaProgressResult";

describe("DsaProgressResult", () => {
  it("renders the student's DSA progress", () => {
    render(
      <DsaProgressResult
        totalProblems={60}
        solvedProblems={42}
        easy={20}
        medium={17}
        hard={5}
        percentage={70}
      />
    );

    expect(
      screen.getByRole("heading", {
        name: "DSA Progress",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("42 of 60 problems solved")
    ).toBeInTheDocument();

    expect(
      screen.getByText("70% complete")
    ).toBeInTheDocument();
  });

  it("shows the difficulty breakdown", () => {
    render(
      <DsaProgressResult
        totalProblems={60}
        solvedProblems={42}
        easy={20}
        medium={17}
        hard={5}
        percentage={70}
      />
    );

    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("Easy")).toBeInTheDocument();

    expect(screen.getByText("17")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Hard")).toBeInTheDocument();
  });

  it("exposes the progress percentage accessibly", () => {
    render(
      <DsaProgressResult
        totalProblems={60}
        solvedProblems={42}
        easy={20}
        medium={17}
        hard={5}
        percentage={70}
      />
    );

    const progressbar = screen.getByRole("progressbar", {
      name: "DSA progress",
    });

    expect(progressbar).toHaveAttribute(
      "aria-valuenow",
      "70"
    );

    expect(progressbar).toHaveAttribute(
      "aria-valuemin",
      "0"
    );

    expect(progressbar).toHaveAttribute(
      "aria-valuemax",
      "100"
    );
  });
});