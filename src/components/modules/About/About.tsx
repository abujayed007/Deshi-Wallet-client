import shovon from "@/assets/images/shovon.png";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";

export function About() {
  const { isLoading } = useGetUserInfoQuery(undefined);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 md:px-20 py-12">
        <Skeleton className="h-10 w-1/3 mx-auto mb-12" />{" "}
        <div className="space-y-8">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-20 w-full" />

          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-20 w-full" />

          <Skeleton className="h-8 w-1/3" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="shadow-lg rounded-xl p-6 text-center">
              <Skeleton className="w-32 h-32 mx-auto rounded-full mb-4" />
              <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
              <Skeleton className="h-4 w-1/3 mx-auto mb-2" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-20 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="leading-relaxed">
          Our digital wallet was created to make sending and receiving money
          easy for everyone, everywhere. We noticed that traditional banking
          services can be limiting, especially in rural areas, so we built a
          secure and user-friendly solution for all financial needs.
        </p>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="leading-relaxed">
          Our mission is to empower people by providing a reliable and
          accessible digital wallet. We aim to enable hassle-free money
          transfers and financial inclusion for everyone in Bangladesh.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-8">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition">
            <img
              src={shovon}
              alt="Abu Jayed"
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-bold">Abu Jayed</h3>
            <p className="">Founder & CEO</p>
            <p className="mt-2">
              Developed and designed this entire project. All credits for this
              Digital Wallet frontend go to Abu Jayed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
