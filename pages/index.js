import SingleNews from "../components/SingleNews";
import Banner from "../components/Banner";
import Loading from "../components/Loading";
import Link from "next/link";
import BelowBannerSlider from "../components/BelowBannerSlider";
import YoutubeSection from "../components/YoutubeSection";
import WhyChooseUs from "../components/WhyChooseUs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/Auth";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../components/PageTitle";

export default function Home() {
  let {user } = useContext(AuthContext);

  let [news, setNews] = useState(null);
  let newsQuery = useQuery({
    queryKey: [`/api/all-news`],
    queryFn: async () => {
      let res = await fetch(`/api/all-news`);
      let data = await res.json();
      return data?.data;
    },
  });
  useEffect(() => {
    if (newsQuery?.data) {
      let activeNews = newsQuery?.data.filter(
        (item) => item.status === "active"
      );
      setNews(activeNews.slice(0, 4));
    }
  }, [newsQuery?.data]);

  let handleDelete = async (id) => {
    let surity = confirm("Are you sure you want to delete?");
    if (!surity) return;
    let res = await fetch(`/api/single-news?id=${id}`, { method: "DELETE" });
    await res.json();
    newsQuery.refetch();
  };

  return (
    <>
      <PageTitle>Home</PageTitle>
      <main className="">
        <div className="bg-[#0E1E32] pt-10">
          <Banner />
          <BelowBannerSlider />
        </div>

        <div className="my-10 max-w-6xl mx-auto grid lg:grid-cols-3 sm:grid-cols-2 gap-16">
          <div className="lg:col-span-2">
            <h1 className="text-xl font-bold p-5 bg-white mb-5">
              <span className="border-b-2 border-[#C31815] pb-1">Late</span>st
              Stories
            </h1>

            {newsQuery?.isLoading ? (
              <Loading />
            ) : (
              <div className="grid lg:grid-cols-2 gap-5">
                {news?.map((n) => (
                  <div key={n?._id} className="relative h-full">
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
            )}

            <div className="w-fit mx-auto">
              <Link
                href="/categories"
                className="btn btn-accent btn-outline btn-lg my-10"
              >
                View More
              </Link>
            </div>
          </div>
          <div>
            <YoutubeSection />
          </div>
        </div>
        <WhyChooseUs />
      </main>
    </>
  );
}
