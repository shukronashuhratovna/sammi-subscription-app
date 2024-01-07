import Head from "next/head";
import { Header, Hero, Modal, Row, SubscriptionPlan } from "src/components";
import { API_REQUEST } from "src/services/api.service";
import { IMovie, MyList, Product } from "src/interfaces/app.interface";
import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import { AuthContext } from "src/context/auth.context";
import { useInfoStore } from "src/store";
import { getList } from "src/helpers/getLists";


export default function Home({ trending, top_rated, animation, products, subscription, myList }: HomeProps): JSX.Element {
  const { isOpenModal } = useInfoStore();

  if (!subscription.length)
    return <SubscriptionPlan products={products} />

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
          <Row movie={myList} title={'My Favourite List'} />
        </section>
      </main>
      <Modal />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ req }) => {
  const user_id = req.cookies.user_id;

  if (!user_id) {
    return { redirect: { destination: '/auth', permanent: false }, };
  }
  const [trending, top_rated, animation, products, subscription] = await Promise.all([
    fetch(API_REQUEST.trending).then(res => res.json()),
    fetch(API_REQUEST.top_rated).then(res => res.json()),
    fetch(API_REQUEST.animation).then(res => res.json()),
    fetch(API_REQUEST.products_list).then(res => res.json()),
    fetch(`${API_REQUEST.subscription}/${user_id}`).then(res => res.json()),
  ]);

  const myList: MyList[] = await getList(user_id);

  return {
    props: {
      trending: trending.results,
      top_rated: top_rated.results,
      animation: animation.results,
      products: products.products.data,
      subscription: subscription.subscription?.data,
      myList: myList.map(c => c.product),
    },
  };
};

interface HomeProps {
  trending: IMovie[]
  top_rated: IMovie[]
  animation: IMovie[]
  products: Product[]
  subscription: string[]
  myList: IMovie[]
}
