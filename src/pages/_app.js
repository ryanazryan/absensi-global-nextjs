import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps, router }) => {
  const pageTransition = {
    initial: {
      opacity: 0, // Mulai dengan opacity 0
    },
    animate: {
      opacity: 1, // Akhiri dengan opacity 1
      transition: {
        duration: 0.5, // Durasi animasi dalam detik
      },
    },
  };

  return (
    <SessionProvider session={pageProps.session}>
      <motion.div
        key={router.route}
        initial="initial"
        animate="animate"
        variants={pageTransition}
      >
        <Component {...pageProps} />
      </motion.div>
    </SessionProvider>
  );
};

export default App;
