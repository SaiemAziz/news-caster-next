import Head from "next/head";

const PageTitle = ({ children }) => {
  return (
    <div>
      <Head>
        <title>{children} - News Caster</title>
      </Head>
    </div>
  );
};

export default PageTitle;
