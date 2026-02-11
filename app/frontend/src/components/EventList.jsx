const EventList = ({ events, onSelect, isAdmin }) => {
  return (
    <div className="w-full">
      {!isAdmin && <h2 className="text-2xl font-bold mb-6 text-slate-800">Recommended Events</h2>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map(event => (
          <div key={event.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 flex flex-col h-full">
            <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
              <span className="text-6xl font-black text-white/10 select-none group-hover:scale-110 transition-transform duration-500">
                {event.title.charAt(0)}
              </span>
              <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-medium border border-white/10">
                {event.total_seats} Seats
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
                📍 {event.location}
              </p>

              <div className="mt-auto pt-4 border-t border-slate-50">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-3">
                  <span>📅 {new Date(event.event_date).toLocaleDateString()}</span>
                  <span>🕒 {new Date(event.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {isAdmin ? (
                  <div className="w-full py-2 bg-slate-100 text-slate-500 text-center text-sm font-semibold rounded-lg select-none">
                    You are the host
                  </div>
                ) : (
                  <button
                    onClick={() => onSelect(event)}
                    className="w-full py-2.5 bg-primary hover:bg-red-600 active:bg-red-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-red-500/30"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
