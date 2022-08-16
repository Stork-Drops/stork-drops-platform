import React, { useEffect, useState, useMemo } from 'react'
import Navigation from "../components/Navigation"
import AppBar from "../components/AppBar"
import Head from 'next/head'
import { Container, Grid, Row } from '@nextui-org/react'
import { fetchContent } from '../utils/fetchContentfulContent'
import CryptoProjectCard from '../components/CryptoProjectCard'
import Footer from '@components/Footer'


const Dropzone = ({ cryptoProjects }) => {
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

            <Navigation/>

            <Container fluid>
            <Grid.Container>
                    <Grid xs={0} sm={0} md={1.5} lg={1.5}>
                        <AppBar/>
                    </Grid>
                    <Grid xs={12} sm={12} md={10.5} lg={10.5} direction="column">
                        <Grid.Container gap={1} direction="row" justify="space-between">
                            <Grid xs={12} sm={12} md={9.5} lg={9.5}>
                            <div>
                                  <Grid.Container direction="column" gap={1}>
                                    <Grid xs={12} sm={12} md={6} lg={6}>
                                      <h2 className="text-dracula text-6xl font-semibold">DYOR</h2>
                                    </Grid>
                                    <Grid>
                                      <span className="text-normal italic font-normal">
                                        Try not to get rekt'd. Seriously..do your own research!
                                      </span>
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
                            <Grid xs={12} sm={12} md={2.5} lg={2.5}>
                                <Grid.Container direction="column">
                                    TF AM I PUTTING HERE
                                </Grid.Container>  
                            </Grid>
                        </Grid.Container>       
                    </Grid>
                </Grid.Container>
            </Container>
            <Footer/>
        </div>
    )
}

export default Dropzone;

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