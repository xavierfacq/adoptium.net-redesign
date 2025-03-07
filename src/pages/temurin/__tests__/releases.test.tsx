import React from "react"
import { act, render } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import Releases, { Head } from "../releases"
import AxiosInstance from "axios"
import MockAdapter from "axios-mock-adapter"
import { mockOsesAPI, mockArchesAPI } from '../../../__fixtures__/hooks'

const mock = new MockAdapter(AxiosInstance)

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
})

vi.mock('../../../hooks/fetchConstants', () => {
  return {
    fetchOses: () => {
      return mockOsesAPI();
    },
    fetchArches: () => {
      return mockArchesAPI();
    }
  };
});

afterEach(() => {
  vi.clearAllMocks()
})

describe("Releases page", () => {
  it("renders correctly", () => {
    mock.onGet().reply(200, [], { pagecount: 0 })

    const { container } = render(<Releases />)
    // eslint-disable-next-line
    const pageContent = container.querySelector("main")

    expect(pageContent).toMatchSnapshot()
  })

  it("head renders correctly", () => {
    mock.onGet().reply(200, [], { pagecount: 0 })

    const { container } = render(<Head />)
    // eslint-disable-next-line
    const title = container.querySelector("title")
    expect(title?.textContent).toEqual("Latest Releases | Adoptium")
  })

  it("has no accessibility violations", async () => {
    mock.onGet().reply(200, [], { pagecount: 0 });

    let container;
    await act(async () => {
      const renderResult = render(<Releases />);
      container = renderResult.container;
    });

    const results = await axe(container);
    // @ts-ignore
    expect(results).toHaveNoViolations();
  });
})
