import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { Grid, Card, Link, Text, Col, Loading, Row, Button, Avatar } from "@nextui-org/react"

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

  console.log(data)
 
  return (
      <>
        {data.items.slice(0,1).map((news) => (
          <Link key={news.title} target="_blank" href={news.link}>
            <Grid.Container justify="center" alignContent="space-between" alignItems="center" direction="row" gap={1}>
              <Grid xs={4}>
              <Avatar
                size="lg" 
                squared 
                src={news.thumbnail}/>
              </Grid>
              <Grid xs={8}>
                <p 
                  style={{
                    fontSize: "0.7rem",
                  }}
                  className="font-semibold text-dracula">
                  {news.title}
                </p>
              </Grid>
            </Grid.Container>
          </Link>
        ))}
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
        {data.items.slice(0,1).map((news) => (
          <Link key={news.title} target="_blank" href={news.link}>
          <Grid.Container justify="center" alignContent="space-between" alignItems="center" direction="row" gap={1}>
            <Grid xs={4}>
            <Avatar
              size="lg" 
              squared 
              src={news.thumbnail}/>
            </Grid>
            <Grid xs={8}>
              <p 
                style={{
                  fontSize: "0.7rem",
                }}
                className="font-semibold text-dracula">
                {news.title}
              </p>
            </Grid>
          </Grid.Container>
        </Link>
        ))}
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
        {data.items.slice(0,1).map((news) => (
          <Link key={news.title} target="_blank" href={news.link}>
          <Grid.Container justify="center" alignContent="space-between" alignItems="center" direction="row" gap={1}>
            <Grid xs={4}>
            <Avatar
              css={{
                border: 0
              }}
              bordered={false}
              size="lg" 
              squared 
              src={news.enclosure.link}/>
            </Grid>
            <Grid xs={8}>
              <p 
                style={{
                  fontSize: "0.7rem",
                }}
                className="font-semibold text-dracula">
                {news.title}
              </p>
            </Grid>
          </Grid.Container>
        </Link>
        ))}
      </>
  );
}

const NewsFeed = () => {   
    return (
        <div>
          <Grid.Container gap={1}>
            <Grid className="w-full flex justify-between items-center">
                <span className="px-3 py-2 text-xs font-semibold shadow-md text-white bg-clean-blue rounded-xl">Latest news</span>
            </Grid>
            <Grid xs={12}>
                <CoinTelegraph/>
            </Grid>
            <Grid xs={12}>
                <DecryptFeed/>
            </Grid>
            <Grid xs={12}>
                <CoinDeskNews/>
            </Grid>
          </Grid.Container>
        </div>
    );
}


export default NewsFeed;