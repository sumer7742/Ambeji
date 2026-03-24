// import Filterdata from "../constant/filterdata";

const Filter: React.FC = () => {
  return (
      <div className="hidden md:block sticky top-24 h-max w-full max-w-xs p-4 sm:p-6 md:p-10 text-sm bg-white">
        {/* {Filterdata.map((e, idx) => (
          <div key={idx}>
            <h3 className="font-bold mb-2 pt-4">{e.heading}</h3>

            <div className="flex flex-col gap-2 pl-2">
              {e.items.map((i, iIdx) => (
                <label key={iIdx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-pink-600"
                  />
                  <span>{i.name}</span>
                </label>
              ))}
            </div>
          </div>
        ))} */}
      </div>
  
  );
};

export default Filter;
