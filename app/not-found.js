
 "use client"
import Boton from "@/components/boton";
import { useRouter } from "next/navigation";

const notfound = () => {
    const router = useRouter()
  return (
  <div>
    <h1>pagina no encontrada</h1>
    <Boton onClick={() => router.back()}>Volver </Boton>
  </div>
  )
};
export default notfound;