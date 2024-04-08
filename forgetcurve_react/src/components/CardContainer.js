import CardSetDetails from "./CardSetDetails";


const CardContainer=()=>{
    return (
        <main className="grid grid-cols-12 grid-rows-12 border">
            <section className="sm:col-span-6 col-span-12">
            <CardSetDetails/>
            </section>
       
        </main>
    )
}

export default CardContainer;