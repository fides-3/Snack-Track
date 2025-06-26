

export default function Age() {
 
  <br></br>

  return (
    <div className="min-h-screen bg-[url('/backgroundimage.jpg')] bg-cover bg-center p-8 ">
      <br></br>
    <div className=" relative rounded-full bg-white place-items-center mx-auto p-6 max-w-2xl  ">
      <p className="font-semibold text-2xl "> 🔹What is your age?</p>
    
    <div className="relative w-64 flex place-items-center border-b-2 border-black px-2 py-1 mx-auto focus-within:border-blue-700">
      {/* Input Field */}
      <input
        type="number"
        placeholder=" "
        className="w-full outline-none bg-transparent text-lg"
      />
       <span className="ml-2">Years</span>
      </div>
       
      
    
    <br></br>
    <div className="flex justify-between mt-8 items-center gap-20">
      <a href="/Height ">
        <button className=" bg-blue-600 rounded-lg flex-row-reverse  text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 ">Back</button>
      </a>
      <a href="/Age">
        <button className="bg-blue-600   text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 rounded-lg flex-row-reverse  ">
          Next
        </button>
      </a>
    </div>
    </div>
    </div>



    
  );
}
