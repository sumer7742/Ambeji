const Recentlyview: React.FC = () => {
    console.log("Recentlyview mounted");

    return (
        <>
            <div className="my-10 px-4  ">
                <h2 className="text-2xl font-bold  mb-6">Recently Viewed Products</h2>

                <div className="flex gap-6 overflow-x-auto no-scrollbar">
                    {/* {Recentlyviewdata.map((item, index) => (
                        <div key={index} className="min-w-[250px] max-w-[250px] flex-shrink-0 text-center">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-40 rounded-xl object-cover"
                            />
                            <p className="mt-2 text-base font-medium">{item.name}</p>
                        </div>
                    ))} */}
                </div>
            </div>



        </>
    )
}
export default Recentlyview;