import { useState } from "react";
import { api } from "../api";

const EventForm = ({ onCreated }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await api.post("/events", {
      title,
      location,
      event_date: date,
      total_seats: Number(seats),
    });

    if (onCreated) {
      onCreated(); // refresh events
    }

    setTitle("");
    setLocation("");
    setDate("");
    setSeats("");
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Event Title</label>
        <input
          placeholder="e.g. Avengers: Secret Wars"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-slate-50 focus:bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
        <input
          placeholder="e.g. IMAX Cinema, NY"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-slate-50 focus:bg-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date & Time</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Total Seats</label>
          <input
            type="number"
            placeholder="e.g. 100"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            min="1"
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-slate-50 focus:bg-white"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-2 py-3 bg-secondary hover:bg-slate-800 text-white font-bold rounded-lg transition-colors shadow-lg shadow-slate-900/10"
      >
        Publish Event
      </button>
    </form>
  );
};

export default EventForm;
