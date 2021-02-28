import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "../components/App";

describe("App component", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<App />);
    expect(asFragment).toMatchSnapshot();
  });

  test("renders message, hidden hand, hidden fish and hidden fortune on initial load", () => {
    const container = render(<App />);
    expect(
      container.getByText("Present your palm, my child.")
    ).toBeInTheDocument();
    expect(document.getElementById("hand-hide")).toBeInTheDocument();
    expect(document.getElementById("fish-hide")).toBeInTheDocument();
    expect(document.getElementById("fortune-hide")).toBeInTheDocument();
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

  test("renders fortune and try again button after a few seconds", async () => {
    const container = render(<App />);
    fireEvent.click(container.getByText("OK"));
    fireEvent.click(container.getByText("Yes"));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 4800));
    });
    expect(document.getElementById("fortune")).toBeInTheDocument();
    expect(container.getByRole("button").textContent).toContain("Try Again");
  });

  test("renders message on 'try again' press", async () => {
    const container = render(<App />);
    fireEvent.click(container.getByText("OK"));
    fireEvent.click(container.getByText("Yes"));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 4800));
    });
    fireEvent.click(container.getByText("Try Again"));
    expect(
      container.getByText(
        "You can't have another go. The fish has spoken. Accept it."
      )
    ).toBeInTheDocument();
  });
});
