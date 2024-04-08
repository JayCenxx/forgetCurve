import CardSetDetails from "./CardSetDetails";


const CardContainer=()=>{
    return (
        <main className="grid grid-cols-12 border w-9/12 mx-auto ">
            <section className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 m-3">
            <CardSetDetails/>
            </section>

            <section className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 m-3">
            <CardSetDetails/>
            </section>
        </main>
    )
}

export default CardContainer;