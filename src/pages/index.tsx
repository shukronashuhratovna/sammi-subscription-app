import Head from "next/head";
import { Header, Hero, Modal, Row } from "src/components";
import { API_REQUEST } from "src/services/api.service";
import { IMovie } from "src/interfaces/app.interface";
import { GetServerSideProps } from "next";
import { useContext } from "react";
import { AuthContext } from "src/context/auth.context";
import { useInfoStore } from "src/store";


export default function Home({ trending, top_rated, animation }: HomeProps): JSX.Element {
  const { isOpenModal } = useInfoStore();
  const { isLoading } = useContext(AuthContext);
  if (isLoading) return <>{null}</>
  return (
    <div className={`relative min-h-screen ${isOpenModal && '!h-screen overflow-hidden'}`}>
      <Head>
        <title>Create next app</title>
        <meta name='decription' content="It is meta content" />
        <link rel='icon' href='/logo.svg' />
      </Head>
      <Header />
      <main className="relative pl-4 pb-4 lg:space-y-24 lg:pl-16">
        <Hero trending={trending} />
        <section>
          <Row movie={top_rated} title={'Top Rated'} />
          <Row movie={trending} title={'TV Shows'} isBig={true} />
          <Row movie={animation} title={'Animation'} />
        </section>
      </main>
      <Modal />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const [trending, top_rated, animation] = await Promise.all([
    fetch(API_REQUEST.trending).then(res => res.json()),
    fetch(API_REQUEST.top_rated).then(res => res.json()),
    fetch(API_REQUEST.animation).then(res => res.json())
  ])
  return {
    props: {
      trending: trending.results,
      top_rated: top_rated.results,
      animation: animation.results
    },
  };
};

interface HomeProps {
  trending: IMovie[]
  top_rated: IMovie[]
  animation: IMovie[]
}
