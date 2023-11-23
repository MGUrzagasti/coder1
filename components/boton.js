"use client"

const Boton = ({children,className ='', ...args}) => {
  return (
  <button className={'bg-teal-600 hover:bg-teal-600 text-white font-bold py-2 px-4 border-b-4 border-teal-600 hover:border-teal-600 rounded ${className}'}
  
  {...args}
  >
  
    {children}
  </button>
  )
}
export default Boton