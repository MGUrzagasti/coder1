
 "use client"
import Boton from "@/components/boton";
import { useRouter } from "next/navigation";

const notfound = () => {
    const router = useRouter()
  return (
  <div>
    <h1>pagina no encontrada</h1>
    <button onClick={() => router.back()}>Volver </button>
  </div>
  )
};
export default notfound;