import Loading from "../../components/Loading";
import Head from 'next/head'

const Details = () => {
    return (
        <div className="max-w-xl mx-auto my-20">
            <Head>
                <title>Details-News Caster</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Loading />
        </div>
    );
};

export default Details;