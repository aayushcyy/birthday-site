import { motion } from "framer-motion";

const Candle = ({ isExtinguished }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[20px] h-[50px] bg-[#e0c068] rounded-[10px] mb-[10px]"></div>
      <motion.div
        className="w-[10px] h-[20px] bg-[#ffcc00] rounded-[50%] relative"
        animate={
          isExtinguished
            ? { opacity: 0 }
            : { y: [0, -5, 0], opacity: [1, 0.8, 1] }
        }
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
      >
        <div
          style={styles.flameCore}
          className="w-[6px] h-[10px] bg-[#ff6600] rounded-[50%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        ></div>
      </motion.div>
    </div>
  );
};

export default Candle;
