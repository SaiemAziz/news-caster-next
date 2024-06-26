import SingleNews from "../components/SingleNews";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import CategoryButtons from "../components/CategoryButtons";
import Head from "next/head";
import AllNews from "../components/AllNews";
import { AuthContext } from "../components/Auth";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../components/PageTitle";

const categories = () => {
  let { cat, setCat, user } = useContext(AuthContext);
  let [news, setNews] = useState([]);
  let [load, setLoad] = useState(true);
  let [button, setButton] = useState(cat || "All");
  let newsQuery = useQuery({
    queryKey: [`/api/categories?category=${button.toLowerCase()}`],
    queryFn: async () => {
      let res = await fetch(`/api/categories?category=${button.toLowerCase()}`);
      let data = await res.json();
      return data?.data;
    },
  });
  // useEffect(() => {
  // setLoad(true)
  // setNews([])
  // fetch(`/api/categories?category=${button.toLowerCase()}`)
  //   .then(res => res.json())
  //   .then(data => {
  //     setNews(data.data)
  //     setLoad(false)
  //   })
  //   newsQuery.refetch()
  // }, [button])

  useEffect(() => {
    if (newsQuery?.data) setNews(newsQuery?.data);
  }, [newsQuery?.data]);

  useEffect(() => {
    setButton(cat);
  }, [cat]);

  let handleDelete = async (id) => {
    let surity = confirm("Are you sure you want to delete?");
    if (!surity) return;
    // console.log(id);
    let res = await fetch(`/api/single-news?id=${id}`, { method: "DELETE" });
    let data = await res.json();
    newsQuery.refetch();
  };
  return (
    <div className=" mb-14">
      <PageTitle>{button}</PageTitle>
      {/* <Head>
        <title>{button}-News Caster</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <div className="bg-[#0E1E32] py-20">
        <h1 className="text-4xl font-bold text-center text-info">
          {button} News: {news.length}
        </h1>
      </div>
      <div className="max-w-7xl mx-auto -mt-10">
        <CategoryButtons
          setCat={setCat}
          setButton={setButton}
          button={button}
          setLoad={setLoad}
        />
      </div>
      {/* <h1 className='text-xl font-bold p-5 bg-white mx-10 -mt-7 mb-5'><span className='border-b-2 border-[#C31815] pb-1'>All</span> News</h1> */}

      {newsQuery?.isLoading ? (
        <div className={`max-w-5xl mx-auto my-11`}>
          <Loading />
        </div>
      ) : (
        <div className=" md:px-20 px-5">
          {button === "All" ? (
            <AllNews news={news} />
          ) : (
            <div>
              {news.length ? (
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                  {news?.map((n) => (
                    <div key={n?._id} className="relative">
                      {user?.email === n?.authorInfo && (
                        <div className="absolute right-2 top-2 z-40">
                          <button
                            className="btn btn-error btn-circle btn-xs text-white"
                            onClick={() => handleDelete(n?._id)}
                          >
                            x
                          </button>
                        </div>
                      )}
                      <SingleNews n={n}></SingleNews>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center my-10 font-semibold text-xl w-full">
                  No news under {button.toUpperCase()} category
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default categories;
