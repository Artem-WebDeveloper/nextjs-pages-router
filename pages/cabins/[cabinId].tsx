import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { getCabin } from '@/lib/data-service';
import CabinView from '@/components/CabinView';

// Генерируется динамически (SSR)
export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const cabinId = params?.cabinId;

  if (typeof cabinId !== 'string' || isNaN(Number(cabinId))) {
    return { notFound: true };
  }

  const cabin = await getCabin(Number(cabinId));

  return { props: { cabin } };
}

function Cabin({ cabin }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const router = useRouter();

  return (
    <>
      <Head>
        <title>Cabin {cabin.name} | The Wild Oasis</title>
      </Head>
      <div className="max-w-6xl mx-auto mt-8">
        <CabinView cabin={cabin} />
      </div>
    </>
  );
}

export default Cabin;

// КАК СДЕЛАТЬ SSG заранее

/* 
import { GetStaticPropsContext, GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { getCabin, getCabins } from '@/lib/data-service'; // Добавили функцию получения всех кабин
import CabinView from '@/components/CabinView';

// 1. Сначала Next.js вызовет эту функцию во время сборки проекта
export const getStaticPaths: GetStaticPaths = async () => {
  // Запрашиваем все кабины из базы данных
  const cabins = await getCabins();

  // Формируем массив путей. 
  // ВАЖНО: параметры (cabinId) внутри getStaticPaths всегда должны быть строками!
  const paths = cabins.map((cabin) => ({
    params: { cabinId: String(cabin.id) },
  }));

  return {
    paths,
    // fallback: 'blocking' означает, что если в БД добавят новую кабину, 
    // Next.js сгенерирует ее на лету при первом запросе, а потом сохранит в кэш.
    // Если поставить false, то любые новые ID будут отдавать 404 без пересборки проекта.
    fallback: 'blocking',
  };
};

// 2. Затем Next.js вызовет эту функцию для КАЖДОГО пути из массива paths
export async function getStaticProps({ params }: GetStaticPropsContext) {
  const cabinId = params?.cabinId;

  // Твоя идеальная проверка остается на месте
  if (typeof cabinId !== 'string' || isNaN(Number(cabinId))) {
    return { notFound: true };
  }

  const cabin = await getCabin(Number(cabinId));

  return { 
    props: { cabin },
    // revalidate: 3600 // Опционально: ISR (регенерация страницы раз в час)
  };
}

// 3. Компонент остается кристально чистым
function Cabin({ cabin }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Cabin {cabin.name} | The Wild Oasis</title>
      </Head>
      <div className="max-w-6xl mx-auto mt-8">
        <CabinView cabin={cabin} />
      </div>
    </>
  );
}

export default Cabin;

*/
