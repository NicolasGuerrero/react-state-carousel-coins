import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it ("renders without crashing", function() {
  render(<Carousel />);
});

it("matches snapshot", function() {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

it("on first picture", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  // expect left arrow to not be shown
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();

  
});

it("works when you click on the right arrow on second picture", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  
  // expect left arrow to be shown
  expect(queryByTestId("left-arrow")).toBeInTheDocument();

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move forward in the carousel
  fireEvent.click(rightArrow);

  // expect right arrow to not be shown
  expect(queryByTestId("right-arrow")).not.toBeInTheDocument();

});

it("goes backwards when you click on left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect left arrow to be shown
  expect(queryByTestId("left-arrow")).toBeInTheDocument();

  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  // expect left arrow to not be shown
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
  
});

