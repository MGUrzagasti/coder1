import Contador from "@/components/contador";
import Header from "@/components/header";

export const metadata = {
  title: 'Carrito de compras',
  description:'app de Next'
}



export default function Home() {
  return (
    <>
       <main className="container m-auto my-10">
      <div className="text-2xl font-bold">
      
    <hr className="px-1.5"></hr>
      <Contador />
      </div>
  
    </main>
    </>
 
  )
}