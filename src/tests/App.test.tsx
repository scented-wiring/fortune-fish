import React from "react";
import { fireEvent, render } from "@testing-library/react";
import App from "../components/App";

describe("App component", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<App />);
    expect(asFragment).toMatchSnapshot();
  });

  test("renders message and hidden hand on initial load", () => {
    const container = render(<App />);
    expect(
      container.getByText("Present your palm, my child.")
    ).toBeInTheDocument();
    expect(document.getElementById("hand-hide")).toBeInTheDocument();
  });

  test("renders new message and hand after OK press", () => {
    const container = render(<App />);
    fireEvent.click(container.getByText("OK"));
    expect(
      container.getByText("Are you ready to hear your fortune?")
    ).toBeInTheDocument();
    expect(document.getElementById("hand")).toBeInTheDocument();
  });

  test("renders message on first 'no' press", () => {
    const container = render(<App />);
    fireEvent.click(container.getByText("OK"));
    fireEvent.click(container.getByText("No"));
    expect(container.getByText("How about now?")).toBeInTheDocument();
  });

  test("renders message on second 'no' press", () => {
    const container = render(<App />);
    fireEvent.click(container.getByText("OK"));
    fireEvent.click(container.getByText("No"));
    fireEvent.click(container.getByText("No"));
    expect(container.getByText("...Now?")).toBeInTheDocument();
  });

  test("renders message and hides hand on third 'no' press", () => {
    const container = render(<App />);
    fireEvent.click(container.getByText("OK"));
    fireEvent.click(container.getByText("No"));
    fireEvent.click(container.getByText("No"));
    fireEvent.click(container.getByText("No"));
    expect(
      container.getByText("Right, just forget it then.")
    ).toBeInTheDocument();
    expect(document.getElementById("hand-hide")).toBeInTheDocument();
  });

  test("renders message and fish on 'yes' press", () => {
    const container = render(<App />);
    fireEvent.click(container.getByText("OK"));
    fireEvent.click(container.getByText("Yes"));
    expect(container.getByText("He comes...")).toBeInTheDocument();
  });

  test("renders button after 3s", async () => {
    const container = render(<App />);
    fireEvent.click(container.getByText("OK"));
    fireEvent.click(container.getByText("Yes"));
    await new Promise((r) => setTimeout(r, 3000));
    expect(container.getByRole("button")).toBeInTheDocument();
  });
});
