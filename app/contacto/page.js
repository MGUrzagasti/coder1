// pages/contacto.js
import Head from 'next/head';
import Image from 'next/image';
const Contacto = () => {
  return (
    <>
       <div>
      <Head>
        <title>Contacto</title>
        <meta name="description" content="Página de contacto" />
      </Head>
      <div className="flex items-center justify-center min-h-screen">
          <Image
            src="/capellari.jpg"
            width={800}
            height={800}
            alt="Picture of the author"
          />
        </div>
      <main className="container mx-auto mt-8 text-center font-extrabold">

     

        <p className='text lg'>¡Estamos encantados de saber de ti! Puedes ponerte en contacto con nosotros a través de:</p>

        <ul className="list-disc pl-6 mt-4">
          <li>Email: ejemplo@correo.com</li>
          <li>Teléfono: (123) 456-7890</li>

        </ul>
      </main>
    </div>
    
    </>
 
  );
};

export default Contacto;
