// import Matchdata from "../constant/matchdata";

const Match: React.FC = () => {
  return (
    <div className="my-10 px-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        
        {/* Left Image */}
        {/* <div className="w-full md:w-1/2">
          <img
            src={Matchdata[0].img}
            alt={`Match item - ${Matchdata[0].name}`}
            className="w-full h-full object-cover rounded-xl"
          />
        </div> */}

        {/* Right Column */}
        {/* <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="flex-1">
            <img
              src={Matchdata[1].img}
              alt={`Match item - ${Matchdata[1].name}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="flex-1">
            <img
              src={Matchdata[2].img}
              alt={`Match item - ${Matchdata[2].name}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default Match;
