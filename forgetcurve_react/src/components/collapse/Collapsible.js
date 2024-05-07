import { useState } from "react";

 
export const Collapsible = ({ title, children }) =>{
    const [isOpen, setIsOpen] = useState(false);

    return (
        <main className="flex justify-center">

       
        <details className="mt-6 collapse  bg-white  basis-6/12" open={isOpen} onClick={() => setIsOpen(!isOpen)}>
            <summary className="collapse-title text-xl font-medium">
                {title}
            </summary>
            <div className="collapse-content">
                {children}
            </div>
        </details>
        </main>
    );
}
