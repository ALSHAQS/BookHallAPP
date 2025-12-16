import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

// Mock framer-motion to avoid animation props warnings
jest.mock("framer-motion", () => ({
  motion: {
    h1: ({ children }) => <h1>{children}</h1>,
    h3: ({ children }) => <h3>{children}</h3>,
    p: ({ children }) => <p>{children}</p>,
    div: ({ children }) => <div>{children}</div>,
  },
}));

describe("Home Component", () => {
  test("renders the main title and subtitle", () => {
    render(<Home />);
    expect(screen.getByText("Book Your Perfect Hall")).toBeInTheDocument();
    expect(screen.getByText("Easy • Fast • Reliable")).toBeInTheDocument();
  });

  test("renders the description paragraph", () => {
    render(<Home />);
    expect(
      screen.getByText(
        "Discover and reserve the ideal venue for weddings, events, meetings and more."
      )
    ).toBeInTheDocument();
  });

  test("renders Log In and Sign Up buttons", () => {
    render(<Home />);
    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Log In").closest("a")).toHaveAttribute("href", "/Login");
    expect(screen.getByText("Sign Up").closest("a")).toHaveAttribute("href", "/Signup");
  });
});
