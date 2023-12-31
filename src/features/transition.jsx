import { motion } from "framer-motion";

const transition = (OgComponent) => {
  return () => (
    <>
      <OgComponent />
      <motion.div className="slide-in flex justify-center items-center text-white" initial={{scale: 1}} animate={{scale: 0}} transition={{duration: 3, ease: [0.22, 1, 0.36, 1]}}>
        <h1 className="lg:text-6xl text-2xl font-bold">Welcome to Ray E-Commerce</h1>
      </motion.div>
    </>
  );
};
 export default transition