



import Contador from "@/components/contador";
import Header from "@/components/header";
import Image from "next/image";

export const metadata = {
  title: 'Carrito de compras',
  description: 'app de Next'
}



export default function Home() {
  return (
    <>



      <main className="container m-auto my-10">
  
   
          <div className="text-2xl font-bold justify-center">

            <hr className="px-1.5"></hr>
            <Image
            src="/capellari.jpg"
            width={1000}
            height={1000}
            alt="Picture of the author"
          />
          
          </div>
    
      </main>

    </>

  )
}