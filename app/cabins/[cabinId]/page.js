import Cabin from "@/app/_components/Cabin";
import Resrvation from "@/app/_components/Resrvation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const curCabin = await getCabin(params.cabinId);

  return {
    title: `Cabin ${curCabin.name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div>
        <Cabin cabin={cabin} />
        <h2 className="text-5xl font-semibold text-center mb-10">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Resrvation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
