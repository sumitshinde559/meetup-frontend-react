import { useState } from "react";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Events = ({ searchQuery, setSearchQuery }) => {
  const [selectedEventType, selectEventType] = useState("Both");

  const { data, loading, error } = useFetch(
    `https://meetup-backend-dun.vercel.app/events`,
  );
  console.log(data);

  const eventTypeHandler = (event) => {
    selectEventType(event.target.value);
  };

  const filteredEvents = data?.allEvents.filter((event) => {
    const matchesType =
      selectedEventType !== "Both" && selectedEventType !== ""
        ? event.eventType === selectedEventType
        : data?.allEvents;

    const searchText = searchQuery?.toLowerCase() || "";
    console.log("SearchText:", searchText);
    const matchesSearch =
      event.title?.toLowerCase().includes(searchText) ||
      event.tags?.join(" ")?.toLowerCase().includes(searchText) ||
      event.details?.toLowerCase().includes(searchText);

    return matchesType && matchesSearch;
  });

  console.log(filteredEvents);

  if (!filteredEvents) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-red-500">
          Not able to load events.
        </h1>
      </div>
    );
  }

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Failed to load events.</p>;
  }
  return (
    <main>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <section className="w-full bg-[#f6f7f8] px-6 py-6">
        {/* Top Section */}
        <div className="max-w-6xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Heading */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f1f1f]">
            Meetup Events
          </h3>
          {searchQuery && (
            <p className="text font-thin text-[#1f1f1f]">
              Search Result For: {searchQuery}
            </p>
          )}
          {/* Select Dropdown */}
          <select
            className="bg-white border border-gray-200 rounded-xl px-5 py-3 text-gray-400 text-lg outline-none shadow-sm"
            id="eventType"
            onChange={eventTypeHandler}
          >
            <option value="">Select Event Type</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Both">Both</option>
          </select>
        </div>

        {/* Events Grid */}

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {filteredEvents &&
            filteredEvents.map((event) => (
              <div key={event._id} className="group cursor-pointer">
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-[280px] object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* Badge */}
                  <span className="absolute top-4 left-4 bg-white text-black text-sm font-medium px-4 py-2 rounded-xl shadow">
                    {event.eventType}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-4">
                  <p className="text-[#877457] text-lg">{event.date}</p>

                  <Link
                    className="text-2xl font-bold text-[#1f1f1f] mt-1"
                    to={"/EventDetails/" + event._id}
                  >
                    {event.title}
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Events;
