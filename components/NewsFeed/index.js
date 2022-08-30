import React from "react";
import useSWR from "swr";
import { Grid, Link, Loading, Avatar } from "@nextui-org/react"

//set up SWR fetcher
const fetcher = (url) => fetch(url).then((res) => res.json());

const API_TO_JSON = `https://api.rss2json.com/v1/api.json?rss_url=`

const DecryptFeed = () => {
  const { data, error } = useSWR(
    API_TO_JSON + "https://decrypt.co/feed",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return <Loading type="points" />;
 
  return (
      <div className="grid grid-cols-1 auto-rows-auto gap-2">
        {data.items.map((news) => (            
            <Link key={news.title} target="_blank" href={news.link} className="flex items-center justify-between w-full hover:bg-gray-50 rounded-xl p-2 border border-gray-200">
              <div className="w-3/12">
                <img className="w-16 h-16 rounded-xl" src={news.thumbnail} alt=""/>
              </div>
              <div className="w-9/12">
                <p 
                  style={{
                    fontSize: "0.8rem",
                  }}
                  className="text-dracula font-medium">
                  {news.title}
                </p>
              </div>
            </Link>
        )).slice(0,2)}
      </div>
  );
}

const CoinTelegraph = () => {
  const { data, error } = useSWR(
    API_TO_JSON + "https://cointelegraph.com/rss/tag/markets",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return <Loading type="points" />;

  return (
      <div className="grid grid-cols-1 auto-rows-auto gap-2">
        {data.items.map((news) => (
          <Link key={news.title} target="_blank" href={news.link}>
            <div className="flex items-center justify-between w-full hover:bg-gray-50 rounded-xl p-2 border border-gray-200">
              <div className="w-3/12">
                <img className="w-16 h-16 rounded-xl" src={news.thumbnail} alt=""/>
              </div>
              <div className="w-9/12">
                <p 
                  style={{
                    fontSize: "0.8rem",
                  }}
                  className="text-dracula font-medium">
                  {news.title}
                </p>
              </div>
            </div>
          </Link>
        )).slice(0,2)}
      </div>
  );
}

const CoinDeskNews = () => {
  const { data, error } = useSWR(
    API_TO_JSON + "https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return <Loading type="points" />;
 
  return (
      <div className="grid grid-cols-1 auto-rows-auto gap-2">
        {data.items.map((news) => (
            <a key={news.title} target="_blank" href={news.link} className="flex items-center justify-between w-full hover:bg-gray-50 rounded-xl p-2 border border-gray-200">
              <div className="w-3/12">
                <img className="w-16 h-16 rounded-xl" src={news.enclosure.link} alt=""/>
              </div>
              <div className="w-9/12">
                <p 
                  style={{
                    fontSize: "0.8rem",
                  }}
                  className="text-dracula font-medium">
                  {news.title}
                </p>
              </div>
            </a>
        )).slice(0,2)}
      </div>
  );
}

const NewsFeed = () => {   
    return (
      <>
        <div>
          <span className="px-2 py-2 text-xs font-semibold text-white bg_sunrise rounded-xl">Crypto News</span>
        </div>
        <div className="my-5 grid gap-4 items-center auto-rows-auto grid-cols-1 md:grid-rows-1 md:grid-cols-3">
          <div>
            <CoinTelegraph/>
          </div>
          <div>
            <DecryptFeed/>
          </div>
          <div>
            <CoinDeskNews/>
          </div>
        </div>
      </>
    );
}


export default NewsFeed;