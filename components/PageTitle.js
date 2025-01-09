import Head from "next/head";

const PageTitle = ({ children }) => {
  
  return (
    <>
      <Head>
        <title>{`${children} - News Caster`}</title>
      </Head>
    </>
  );
};

export default PageTitle;
