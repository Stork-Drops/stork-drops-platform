import React from "react";
import useSWR from "swr";
import { Grid, Link, Loading, Avatar } from "@nextui-org/react"

//set up SWR fetcher
const fetcher = (url) => fetch(url).then((res) => res.json());

const API_TO_JSON = `https://api.rss2json.com/v1/api.json?rss_url=`

const CoinTelegraph = () => {
  const { data, error } = useSWR(
    API_TO_JSON + "https://cointelegraph.com/rss/tag/markets",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return <Loading type="points" />;

  return (
    <div className="grid grid-cols-2 auto-rows-auto gap-2 items-start">
        {data.items.map((news) => (
              <Link key={news.title} target="_blank" href={news.link}>
                <div className="">
                  <img className="" src={news.thumbnail} alt="Telegraph Article Image"/>
                    <p className="py-2.5 text-dracula text-xs font-semibold">
                      {news.title}
                    </p>
                </div>
              </Link>
            )).slice(0,2)}
    </div>
  );
}

const DecryptFeed = () => {
  const { data, error } = useSWR(
    API_TO_JSON + "https://decrypt.co/feed",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return <Loading type="points" />;
 
  return (
    <div className="grid grid-cols-2 auto-rows-auto gap-2 items-start">
    {data.items.map((news) => (
          <Link key={news.title} target="_blank" href={news.link}>
            <div className="">
              <img className="" src={news.thumbnail} alt="Telegraph Article Image"/>
                <p className="py-2.5 text-dracula text-xs font-semibold">
                  {news.title}
                </p>
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
    <div className="grid grid-cols-2 auto-rows-auto gap-2 items-start">
    {data.items.map((news) => (
          <Link key={news.title} target="_blank" href={news.link}>
            <div className="">
              <img className="" src={news.enclosure.link} alt="Telegraph Article Image"/>
                <p className="py-2.5 text-dracula text-xs font-semibold">
                  {news.title}
                </p>
            </div>
          </Link>
        )).slice(0,2)}
    </div>
  );
}

const NewsFeed = () => {   
    return (
        <div className="grid gap-2 items-center md:auto-rows-auto md:grid-cols-1">
          <h2 className="text-dracula text-xl font-semibold">Latest News</h2>
          <div>
            <CoinTelegraph/>
            <DecryptFeed/>
            <CoinDeskNews/>
          </div>
        </div>
    );
}


export default NewsFeed;