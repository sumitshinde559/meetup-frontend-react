import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useFetch from "../useFetch";

const EventDetails = () => {
  const { eventId } = useParams();

  const { data, loading, error } = useFetch(
    "https://meetup-backend-dun.vercel.app/events",
  );

  const events = data?.allEvents || [];

  const eventDetails = events.find((event) => event._id === eventId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-red-500">
          Failed to load event.
        </h1>
      </div>
    );
  }

  return (
    <main className="bg-[#f8f9fb] min-h-screen">
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-14">
          {/* LEFT SECTION */}
          <div>
            {/* Title */}
            <h1 className="text-5xl font-bold text-[#1f1f1f]">
              {eventDetails?.title}
            </h1>

            {/* Hosted By */}
            <div className="mt-6">
              <p className="text-gray-600 text-lg">Hosted By:</p>

              <h3 className="text-2xl font-semibold text-[#1f1f1f]">
                {eventDetails?.hostedBy}
              </h3>
            </div>

            {/* Main Image */}
            <div className="mt-10 overflow-hidden rounded-3xl">
              <img
                src={eventDetails?.image}
                alt={eventDetails?.title}
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Details */}
            <div className="mt-12">
              <h2 className="text-4xl font-bold text-[#1f1f1f] mb-6">
                Details:
              </h2>

              <p className="text-gray-700 leading-9 text-lg">
                {eventDetails?.details}
              </p>
            </div>

            {/* Additional Information */}
            <div className="mt-12">
              <h2 className="text-4xl font-bold text-[#1f1f1f] mb-6">
                Additional Information:
              </h2>

              <div className="space-y-4 text-lg">
                <p>
                  <span className="font-bold">Dress Code:</span>{" "}
                  {eventDetails?.additionalInfo.dressCode}
                </p>

                <p>
                  <span className="font-bold">Age Restrictions:</span>{" "}
                  {eventDetails?.additionalInfo.ageRestrictions}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12">
              <h2 className="text-4xl font-bold text-[#1f1f1f] mb-6">
                Event Tags:
              </h2>

              <div className="flex flex-wrap gap-4">
                {eventDetails?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#f65858] text-white px-5 py-2 rounded-xl text-sm font-medium shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="sticky top-24 h-fit">
            {/* Event Info Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
              {/* Time */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">🕒</span>

                <div>
                  <p className="text-lg text-gray-700">
                    {new Date(eventDetails?.startDate).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}{" "}
                    IST
                  </p>

                  <p className="text-lg text-gray-700">
                    to{" "}
                    {new Date(eventDetails?.endDate).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}{" "}
                    IST
                  </p>
                </div>
              </div>
              {/* Location */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span>

                <div>
                  {eventDetails?.eventType == "Online" ? (
                    <p className="text-xl font-semibold">
                      {eventDetails?.eventType}
                    </p>
                  ) : (
                    <p className="text-xl font-semibold">
                      {eventDetails?.location.address}
                    </p>
                  )}

                  <p className="text-gray-600">{eventDetails?.address}</p>
                </div>
              </div>
              {/* Price */}
              <div>
                {eventDetails?.price != 0 && (
                  <h3 className="text-3xl font-bold">
                    ₹ {eventDetails?.price}
                  </h3>
                )}
              </div>
            </div>

            {/* Speakers */}
            <div className="mt-10">
              <h2 className="text-4xl font-bold text-[#1f1f1f] mb-6">
                Speakers:
              </h2>

              <div className="grid grid-cols-2 gap-5">
                {eventDetails?.speakers?.map((speaker, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 text-center"
                  >
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto"
                    />

                    <h3 className="mt-4 text-xl font-bold">{speaker.name}</h3>

                    <p className="text-gray-600 mt-1">{speaker.designation}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EventDetails;
