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
      <>
        {data.items.map((news) => (            
            <Link key={news.title} target="_blank" href={news.link} className="flex items-center justify-between w-full hover:bg-gray-50 rounded-xl p-2">
              <div className="w-4/12">
                <img className="w-16 h-16 rounded-xl" src={news.thumbnail} alt=""/>
              </div>
              <div className="w-8/12">
                <p 
                  style={{
                    fontSize: "0.7rem",
                  }}
                  className="text-dracula">
                  {news.title}
                </p>
              </div>
            </Link>
        )).slice(0,1)}
      </>
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
      <>
        {data.items.map((news) => (
          <Link key={news.title} target="_blank" href={news.link}>
            <div className="flex items-center justify-between w-full hover:bg-gray-50 rounded-xl p-2">
              <div className="w-4/12">
                <img className="w-16 h-16 rounded-xl" src={news.thumbnail} alt=""/>
              </div>
              <div className="w-8/12">
                <p 
                  style={{
                    fontSize: "0.7rem",
                  }}
                  className="text-dracula">
                  {news.title}
                </p>
              </div>
            </div>
        </Link>
        )).slice(0,1)}
      </>
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
      <>
        {data.items.map((news) => (
            <a key={news.title} target="_blank" href={news.link} className="flex items-center justify-between w-full hover:bg-gray-50 rounded-xl p-2">
              <div className="w-4/12">
                <img className="w-16 h-16 rounded-xl" src={news.enclosure.link} alt=""/>
              </div>
              <div className="w-8/12">
                <p 
                  style={{
                    fontSize: "0.7rem",
                  }}
                  className="text-dracula">
                  {news.title}
                </p>
              </div>
            </a>
        )).slice(0,1)}
      </>
  );
}

const NewsFeed = () => {   
    return (
        <div className="grid auto-rows-auto grid-cols-1">
          <div className="mb-2.5">
            <span className="px-2 py-2 text-xs font-semibold shadow-md text-white bg_sunrise rounded-xl">Latest crypto news</span>
          </div>
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
    );
}


export default NewsFeed;