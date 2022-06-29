import React, { useEffect, useState, useMemo } from 'react'
import Link from "next/link"
import Navigation from "../components/Navigation"
import AppBar from "../components/AppBar"
import Head from 'next/head'
import { Container, Grid, Row } from '@nextui-org/react'
import { fetchContent } from '../utils/fetchContentfulContent'
import CryptoProjectCard from '../components/CryptoProjectCard'


const Calendar = ({ cryptoProjects }) => {
    const [cryptoProjectsList, setCryptoProjectsList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSort, setSelectedSort] = useState('')


    useEffect(() => {
      setCryptoProjectsList(cryptoProjects);
    }, []);

    function handleCategoryChange(event) {
      setSelectedCategory(event.target.value);
   }

   function handleSortingChange(event){
      setSelectedSort(event.target.value)
   }
    // Filter Category Dropdown Function
    const filteredProjects = cryptoProjects.filter((category) => {
      if (!selectedCategory) {
        return cryptoProjectsList;
      }
        return category.projectCategory.toString().toLowerCase().includes(selectedCategory.toString().toLowerCase());
    });

    const sortedProjects = filteredProjects.sort((a,b) => {
      // descending (latest to oldest)
      if (!selectedSort) {
        return new Date(b.projectDropDate).getTime() - new Date(a.projectDropDate).getTime()
      }
      // ascending (oldest to latest)
      if (selectedSort) {
        return new Date(a.projectDropDate).getTime() - new Date(b.projectDropDate).getTime()
      }
      return null
    });

    return(
        <div>
            <Head>
                <title>Stork Drops - Airdrops. Whitelists. Alpha. One Social Platform.</title>
                <meta name="description" content="What if we assembled a group of people to buy a futbol club?" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container xl>
              <Navigation/>
              <Grid.Container gap={1} justify="center"> 
                <Grid xs={12} className="min-h-screen">
                      <div>
                        <Grid.Container direction="column" gap={2}>
                          <Grid xs={12} sm={12} md={6} lg={6}>
                            <h2 className="text-dracula text-5xl font-semibold">Calendar Drops</h2>
                          </Grid>
                          <Grid>
                            <span className="text-normal italic font-normal">Stay up-to-date on some dope upcoming projects. <br/>Hand-picked - no fluff or shite.</span>
                          </Grid>
                        </Grid.Container>
                        <Grid.Container direction="row" gap={2}>
                          <Grid xs={12} sm={12} md={3} lg={3}>
                            <div className="w-full">
                                <label className="block text-normal font-semibold text-dracula">Filter by category</label>
                                <select
                                  className="block w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                  onChange={handleCategoryChange}>
                                  <option value="">All</option>
                                  <option value="solana">Solana</option>
                                  <option value="ethereum">Ethereum</option>
                                  <option value="staking">Staking</option>
                                </select>
                            </div>
                          </Grid>
                          <Grid xs={12} sm={12} md={3} lg={3}>
                            <div className="w-full">
                                <label className="block text-normal font-semibold text-dracula">Sort by</label>
                                <select
                                  className="block w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                  onChange={handleSortingChange}>
                                  <option value="">Newest</option>
                                  <option value="ascending">Oldest</option>
                                </select>
                            </div>
                          </Grid>
                        </Grid.Container>
                        <Grid.Container direction="row" gap={2}>
                          {sortedProjects && sortedProjects.length > 0 ? (
                            sortedProjects
                              .map((cryptoProject) => (
                                <Grid xs={12} sm={12} md={3} lg={3}>
                                  <CryptoProjectCard 
                                      key={cryptoProject.sys.id}
                                      cryptoProject={cryptoProject}
                                  />
                                </Grid>
                            ))
                          ) : (
                            <h1>No results found!</h1>
                          )}
                        </Grid.Container>
                    </div>
                </Grid>
              </Grid.Container>
            </Container>
        </div>
    )
}

export default Calendar;

export async function getStaticProps() {
  const res = await fetchContent(`
    {
      cryptoProjectCollection {
        items {
          sys {
            id
          }
          projectTitle
          projectSlug
          projectCategory
          projectDescription
          projectThumbnail {
            url
          }
          projectDropDate
        }
      }
    }
    `)
  return {
    props: {
      cryptoProjects: res.cryptoProjectCollection.items,
    },
  }
} 