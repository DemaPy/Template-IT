import { http, HttpResponse } from 'msw'
 
export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('http://localhost:7777/campaigns', () => {
    // ...and respond to them using this JSON response
    console.log('Captured a "GET /categories" request')
    return HttpResponse.json([
      {
        id: "asd",
        title: "Test Category"
      },
      {
        status: 200
      }
    ])
  }),
  http.post('/categories', () => {
    console.log('Captured a "POST /categories" request')
  }),
  http.delete('/categories/:id', ({ params }) => {
    console.log(`Captured a "DELETE /categories/${params.id}" request`)
  }),
]