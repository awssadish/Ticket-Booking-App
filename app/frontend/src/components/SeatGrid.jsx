import { useState } from "react";

const SeatGrid = ({ tickets, onBook, eventName }) => {
  const [selected, setSelected] = useState(null);

  const selectedTicket = tickets.find(t => t.id === selected);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-800">{eventName}</h2>
        <p className="text-slate-500 text-sm mt-1">Select your preferred seat</p>
      </div>

      <div className="mb-12 perspective-500">
        <div className="w-3/4 h-8 bg-gradient-to-b from-slate-200 to-white mx-auto transform -rotate-2 -skew-x-12 shadow-xl rounded-sm border-t border-slate-300 text-center leading-8 text-[10px] tracking-[0.5em] text-slate-400 font-bold select-none">
          SCREEN
        </div>
        <div className="w-3/4 mx-auto h-8 bg-gradient-to-t from-blue-50/50 to-transparent blur-xl -mt-4"></div>
      </div>

      <div className="max-w-xl mx-auto grid grid-cols-8 gap-3 justify-items-center mb-10">
        {tickets.map(ticket => (
          <button
            key={ticket.id}
            disabled={ticket.is_booked}
            onClick={() => setSelected(ticket.id)}
            title={`Seat ${ticket.seat_number} - $${ticket.price}`}
            className={`
              w-9 h-9 rounded-t-lg text-xs font-medium transition-all duration-200 flex items-center justify-center border
              ${ticket.is_booked
                ? "bg-slate-100 text-slate-300 border-transparent cursor-not-allowed"
                : selected === ticket.id
                  ? "bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/40 scale-110 z-10"
                  : "bg-white text-slate-600 border-slate-200 hover:border-green-400 hover:bg-green-50 hover:text-green-600"
              }
            `}
          >
            {ticket.seat_number}
          </button>
        ))}
      </div>

      <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border border-slate-200 rounded"></div>
            <span className="text-slate-500">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded shadow-sm"></div>
            <span className="text-slate-500">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-100 rounded"></div>
            <span className="text-slate-500">Booked</span>
          </div>
        </div>

        <button
          disabled={!selected}
          onClick={() => {
            if (selected) {
              onBook(selected);
              setSelected(null);
            }
          }}
          className={`
            px-8 py-3 rounded-lg font-bold text-white transition-all shadow-lg
            ${selected
              ? "bg-green-500 hover:bg-green-600 shadow-green-500/30 transform hover:-translate-y-0.5"
              : "bg-slate-200 text-slate-400 shadow-none cursor-not-allowed"}
          `}
        >
          {selected ? `Pay $${selectedTicket?.price || 0} & Book` : 'Select a Seat'}
        </button>
      </div>
    </div>
  );
};

export default SeatGrid;
