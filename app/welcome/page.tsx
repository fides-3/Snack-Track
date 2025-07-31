function Welcome(){
    return(
    <div className="bg-[url('/backgroundimage.jpg')] dark:bg-[url('/darkbg.jpg')]  bg-cover bg-center pt-0   min-h-screen ">
        <div className="items-center justify-center      ">
         <div className="flex flex-col items-center  justify-center text-center  space-y-5">
          
           <h1 className="font-bold text-3xl mt-20 text-blue-700" >Welcome to Snack & Track !</h1>
           <p className="font-semibold text-lg text-gray-700">Your journey of mindful eating starts here🍱.</p>
            <p className="font-semibold text-lg text-gray-700">Easily log your meals,snacks and water intake🥛.</p>
           <p className="font-semibold text-lg text-gray-700">Let's track your day one snack at a time😎.</p>
          
         
             <a href="/Goal">
            <button className="bg-blue-500 animate-pulse  mt-8 rounded-lg py-2 px-6  items-center text-white hover:bg-blue-700 transition-duration-500">
            Get Started
           </button>
           </a>
            
          </div> 
            
        </div>
    </div>
    )
 
 }
export default Welcome




