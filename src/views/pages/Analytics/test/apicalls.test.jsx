import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { render, waitForElement } from "@testing-library/react";
// import "jest-dom/extend-expect";
import axios from "axios";
import Analytics from '../Analytics';

const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/user/blockedDomains', (req, res, ctx) => {
      // respond using a mocked JSON body
      return res(ctx.json({
        blockedDomains: [
          "example.com"
        ]
      }))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('handlers server error', async () => {
    server.use(
      // override the initial "GET /greeting" request handler
      // to return a 500 Server Error
      rest.get('/user/blockedDomains', (req, res, ctx) => {
        return res(ctx.status(200))
      })
)})

// afterEach(() => {
//   axios.get.mockClear();
// });

function mockCall() {
  axios.get.mockResolvedValueOnce({
    "userHistory": [
      {
        "domain": "google.com",
        "tags": [
          "string"
        ],
        "url": "google.com/who_is_parsa",
        "eventType": "CLICK",
        "createdAt": "2021-06-24T15:25:37.424Z"
      },
      {
        "domain": "example.com",
        "tags": [
          "string"
        ],
        "url": "example.com",
        "eventType": "CLICK",
        "createdAt": "2021-06-24T15:25:37.424Z"
      }
    ]
  });
}

// test('render most popular sites' , () => {
//   mockCall();

//   const {getAllByTestId} = render(<Analytics /> );

//   expect(screen.getByText('gooooogle.com')).toBeInTheDocument() ;
// })