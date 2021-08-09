import { Flex } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Cities from "../../components/Countries";
import Content from "../../components/Content";
import ContinentBanner from "../../components/ContinentBanner";
import Header from "../../components/Header";
import { useRouter } from "next/dist/client/router";
import Loading from "../../components/Loading";
import { api } from "../../services/api";

export interface ContinentProps {
  continent: {
    slug: string;
    title: string;
    description: string;
    banner_image: string;
    countries: number;
    languages: number;
    cities: number;
    cities_list: string;
    countriesList: {
      country: string;
      capital: string;
      image: string;
      flag: string;
    }[]
  }
}

export default function Continent({continent}: ContinentProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading />
  }

  return (
    <Flex direction="column">
      <Head>
        <title>WorldTrip - {continent.title}</title>

        <meta property="og:title" content={`WorldTrip ${continent.title}`} />
        <meta property="og:description" content={continent.description} />
        <meta name="twitter:title" content={`WorldTrip ${continent.title}`} />

        <meta name="twitter:image" content={continent.banner_image} />
        <meta name="twitter:image:src" content={continent.banner_image} />
        <meta property="og:image" content={continent.banner_image} />
        <meta property="og:image:secure_url" content={continent.banner_image} />
      </Head>

      <Header />
      <ContinentBanner continent={continent} />

      <Flex direction="column" maxW="1160px" mx="auto" mb="10" px="1rem">
        <Content continent={continent} />
        <Cities countries={continent.countriesList} />
      </Flex>
    </Flex>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const {data} = await api.get(`/continents/${slug}`);
  console.log(data)
  const continent = {
    slug:data.id,
    title: data.name,
    description: data.text,
    banner_image: data.bannerImage,
    countries: data.numberOfCountries,
    languages: data.numberOfCountries,
    cities: data.numberOfCity,
    cities_list: data.citiesList,
    countriesList: data.countries.map(country => {
      return {
        country: country.name,
        capital: country.capital,
        image: country.image,
        flag:country.flag,
      }
    })
  };

  return {
    props: {
      continent
    },
    revalidate: 1800,
  }
}