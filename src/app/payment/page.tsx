import { SearchParams } from "next/dist/server/request/search-params"

export default async function IndexPage({ searchParams }:SearchParams) {
    const { canceled}:any = await searchParams
  
    if (canceled) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      )
    }
    return (  <form action="/api/stripe" method="POST">
    <section>
      <button type="submit" role="link">
        Checkout
      </button>
    </section>
  </form>
    
    )
  }