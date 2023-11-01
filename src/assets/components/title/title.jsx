function Title({children}) {
    return ( 
        <div className="flex justify-center my-4">
           <h1 className="font-bold text-xl">
            {children}
            </h1>
        </div>
     );
}

export default Title;