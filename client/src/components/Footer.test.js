import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  test("renders brand section", () => {
    render(<Footer />);
    expect(screen.getByText("BookMyHall")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A modern platform for booking luxury event halls easily and securely."
      )
    ).toBeInTheDocument();
  });

  test("renders quick links section", () => {
    render(<Footer />);
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("renders contact section", () => {
    render(<Footer />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Email: info@bookmyhall.com")).toBeInTheDocument();
    expect(screen.getByText("Phone: +968 9999 9999")).toBeInTheDocument();
  });

  test("renders footer bottom with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} BookMyHall. All rights reserved.`)
    ).toBeInTheDocument();
  });
});
