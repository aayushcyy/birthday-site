import { motion } from "framer-motion";

const Candle = ({ isExtinguished }) => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="w-[10px] h-[20px] bg-[#F8A210] rounded-[50%] -mb-2 relative"
        animate={
          isExtinguished
            ? { opacity: 0 }
            : {
                y: [0, -5, 0],
                opacity: [1, 0.8, 1],
                boxShadow: [
                  "0 0 50px 25px rgba(248,162,16,0.8)", // Intense glow
                  "0 0 60px 30px rgba(248,162,16,0.9)", // Larger glow
                  "0 0 50px 25px rgba(248,162,16,0.8)", // Back to intense glow
                ],
              }
        }
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
      >
        <div className="w-[6px] h-[10px] bg-[#f89710] rounded-[50%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "></div>
      </motion.div>
      <div className="w-[2px] h-2 bg-[#8b7b7b]"></div>
      <div className="w-[14px] h-[50px] border-[1px] border-[#9187878b] bg-[#5FEDB5] rounded-t-[10px] mb-[10px]"></div>
    </div>
  );
};

export default Candle;
