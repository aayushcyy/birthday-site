import { motion } from "framer-motion";

const Candle = ({ isExtinguished, className }) => {
  return (
    <div className={`flex absolute flex-col items-center ${className}`}>
      <motion.div
        className="md:w-[10px] w-[3px] md:h-[20px] h-[10px] bg-[#F8A210] rounded-[100%] md:-mb-2 -mb-[6px] relative"
        animate={
          isExtinguished
            ? { opacity: 0 } // Flame extinguished
            : {
                y: [0, -5, 0], // Flicker effect
                opacity: [1, 0.8, 1],
                boxShadow: [
                  "0 0 50px 25px rgba(248,162,16,0.2)",
                  "0 0 60px 30px rgba(248,162,16,0.3)",
                  "0 0 50px 25px rgba(248,162,16,0.2)",
                ],
              }
        }
        transition={{
          repeat: isExtinguished ? 0 : Infinity, // Stop animation when extinguished
          duration: 1,
          ease: "easeInOut",
        }}
      >
        <div className="md:w-[6px] md:h-[10px] w-[5px] h-[8px] bg-[#f89710] rounded-t-[50%] rounded-b-[40%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "></div>
      </motion.div>

      <div className="w-[1px] h-[4px] bg-[#8b7b7b]"></div>
      <div className="md:w-[10px] w-[6px] md:h-[35px] h-[20px] border-[1px] border-[#9187878b] bg-[#5FEDB5] rounded-t-[10px] mb-[10px]"></div>
    </div>
  );
};

export default Candle;
