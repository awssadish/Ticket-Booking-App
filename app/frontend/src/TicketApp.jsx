import { useEffect, useState } from "react";
import { api } from "./api";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import SeatGrid from "./components/SeatGrid";
import MyBookings from "./components/MyBookings";

const TicketApp = ({ onLogout }) => {
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };

  const selectEvent = async (event) => {
    if (role === "ADMIN") return;

    setSelectedEvent(event);
    const res = await api.get(`/tickets/${event.id}`);
    setTickets(res.data);
  };

  const bookSeat = async (ticketId) => {
    await api.post("/bookings", {
      ticket_id: ticketId
    });

    selectEvent(selectedEvent);
  };

  const displayedEvents = role === "ADMIN"
    ? events.filter(e => e.created_by == userId)
    : events;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="fixed top-0 left-0 right-0 h-16 bg-secondary text-white shadow-lg z-50 flex items-center justify-between px-4 md:px-8">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🎬</span> BookMyTicket
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <span className="block text-sm font-semibold">
              {role === "ADMIN" ? "Admin Dashboard" : `Welcome, ${localStorage.getItem('userName') || 'User'}`}
            </span>
            <span className="block text-xs opacity-70 lowercase">
              {localStorage.getItem('email') || role}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="px-3 py-1.5 text-sm rounded border border-white/20 hover:bg-white/10 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        {/* ADMIN VIEW */}
        {role === "ADMIN" && (
          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 items-start">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
              <h3 className="text-lg font-bold text-secondary mb-4 border-b pb-2">Create New Event</h3>
              <EventForm onCreate={loadEvents} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[500px]">
              <h3 className="text-lg font-bold text-secondary mb-4 border-b pb-2">My Events ({displayedEvents.length})</h3>
              {displayedEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="italic">You haven't created any events yet.</p>
                </div>
              ) : (
                <EventList
                  events={displayedEvents}
                  onSelect={() => { }}
                  isAdmin={true}
                />
              )}
            </div>
          </div>
        )}

        {/* USER VIEW */}
        {role !== "ADMIN" && (
          <>
            {!selectedEvent ? (
              <EventList
                events={displayedEvents}
                onSelect={selectEvent}
              />
            ) : (
              <div className="max-w-4xl mx-auto animate-fade-in">
                <div className="mb-6">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors text-sm font-medium"
                  >
                    &larr; Back to Events
                  </button>
                </div>
                <SeatGrid
                  tickets={tickets}
                  onBook={bookSeat}
                  eventName={selectedEvent.title}
                />
              </div>
            )}

            {!selectedEvent && (
              <div className="mt-16 border-t border-slate-200 pt-8">
                <MyBookings />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default TicketApp;
