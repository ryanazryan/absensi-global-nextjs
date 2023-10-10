import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head'; // Import Head dari next/head

const App = ({ Component, pageProps, router }) => {
  const pageTransition = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <meta name="csrf-token" content="{{ csrf_token() }}" />
      </Head>
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
