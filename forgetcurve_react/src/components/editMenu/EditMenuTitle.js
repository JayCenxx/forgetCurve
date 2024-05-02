const EditMenuTitle = () => (
  <>
    <main className="pl-6 mt-8 ">
      <section className="flex  mb-2  ">
        <div className="basis-[13%] " />
        <h2 className="text-xl font-bold ml-5">Title</h2>
      </section>

      <section className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Title"
          className=" input w-full basis-9/12  ring-emerald-300 focus:border-none focus:ring shadow-lg"
        />
      </section>

      <section className="flex  mb-2  ">
        <div className="basis-[13%] " />
        <h2 className="text-xl font-bold ml-5">Description</h2>
      </section>

      <section className="flex justify-center mb-4">
        <textarea
          className="textarea basis-9/12  ring-emerald-300 focus:border-none focus:ring shadow-lg min-h-28"
          placeholder="Description"
        ></textarea>
      </section>

      <section className="flex  mb-2  ">
        <div className="basis-[13%] " />
        <h2 className="text-xl font-bold ml-5">Tag</h2>
      </section>

      <section className="flex justify-center ">
        <select className="select basis-9/12  ring-emerald-300 focus:border-none focus:ring shadow-lg  ">
          <option disabled selected>  Select a Tag </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </section>
    </main>
  </>
);

export default EditMenuTitle;
