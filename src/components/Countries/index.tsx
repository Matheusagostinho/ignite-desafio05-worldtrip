import { Grid, Heading } from "@chakra-ui/react";
import City from "./City";


export default function Countries({countries}) {
  return (
    <>
      <Heading fontWeight="500" fontSize={["2xl","4xl"]} mb="10">Países</Heading>
      <Grid templateColumns={["1fr","1fr 1fr", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gap={['20px','45px']} alignItems="center" justifyContent="center" px={["30px", "0"]}>
        {countries.map(city => (
          <City
            key={city.country}
            name={city.country}
            capital={city.capital}
            flag={city.flag}
            image={city.image}
          />
        ))}
      </Grid>
    </>
  )
 }