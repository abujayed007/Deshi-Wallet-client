import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi"; // example query

const testimonials = [
  {
    id: 1,
    name: "Ayesha Rahman",
    role: "Freelancer",
    feedback:
      "This platform made sending and receiving money so simple. Fast transactions and excellent security!",
  },
  {
    id: 2,
    name: "Rahim Uddin",
    role: "Small Business Owner",
    feedback:
      "I can pay my suppliers instantly and withdraw money anytime. It really boosted my business.",
  },
  {
    id: 3,
    name: "Sadia Khatun",
    role: "Student",
    feedback:
      "Managing expenses is so easy now. The wallet system is smooth and very user-friendly.",
  },
];

const Testimonials = () => {
  const { isLoading } = useGetUserInfoQuery(undefined); // use your actual query

  return (
    <section className="py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold sm:text-4xl">
            {isLoading ? (
              <Skeleton className="h-8 w-64 mx-auto" />
            ) : (
              "What Our Users Say"
            )}
          </h2>
          <div className="mt-2">
            {isLoading ? (
              <Skeleton className="h-4 w-80 mx-auto" />
            ) : (
              "Hear from people who are already using our platform"
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? [...Array(3)].map((_, i) => (
                <Card
                  key={i}
                  className="rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : testimonials.map((t) => (
                <Card
                  key={t.id}
                  className="rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <CardContent className="p-6">
                    <p className="mb-4">“{t.feedback}”</p>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
