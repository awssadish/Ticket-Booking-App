import { useEffect, useState } from "react";
import { api } from "../api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/my").then(res => setBookings(res.data));
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-12">
      <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
        <span>🎟</span> My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-slate-400 italic text-center py-8">You haven't booked any tickets yet. Go watch a movie!</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b, i) => (
            <div key={i} className="relative bg-white p-5 rounded-lg shadow-sm border border-slate-200 flex justify-between items-center overflow-hidden hover:shadow-md transition-shadow group">
              {/* Decorative side accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary group-hover:bg-primary transition-colors"></div>

              <div className="pl-4">
                <h4 className="font-bold text-lg text-slate-800 mb-1">{b.title}</h4>
                <p className="text-sm text-slate-500 mb-1 flex items-center gap-1">📍 {b.location}</p>
                <p className="text-xs text-slate-400 font-medium bg-slate-50 inline-block px-2 py-1 rounded">
                  🗓 {new Date(b.booked_at).toLocaleString()}
                </p>
              </div>

              <div className="text-right pl-8 border-l-2 border-dashed border-slate-100 relative">
                <div className="absolute -left-[9px] -top-3 w-4 h-4 bg-white rounded-full border-b border-slate-200"></div>
                <div className="absolute -left-[9px] -bottom-3 w-4 h-4 bg-white rounded-full border-t border-slate-200"></div>

                <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Seat</span>
                <strong className="text-2xl font-black text-primary">{b.seat_number}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
