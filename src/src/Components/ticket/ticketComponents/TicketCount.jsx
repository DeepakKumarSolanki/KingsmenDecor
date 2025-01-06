const TicketCount = ({ tickets, previousCounts }) => {
  // Ensure tickets is an array
  if (!Array.isArray(tickets)) {
    console.error("Invalid tickets prop:", tickets);
    tickets = [];
  }

  // Default previousCounts to zero if not provided
  const defaultCounts = { new: 0, solved: 0, open: 0, pending: 0 };
  previousCounts = { ...defaultCounts, ...previousCounts };

  // Count tickets based on their status
  const ticketCounts = {
    new: 0,
    solved: 0,
    open: 0,
    pending: 0,
  };

  tickets.forEach((ticket) => {
    console.log("Processing ticket:", ticket);
    const status = ticket.status?.toLowerCase();
    if (status === "new") ticketCounts.new += 1;
    if (status === "closed") ticketCounts.solved += 1;
    if (status === "open") ticketCounts.open += 1;
    if (status === "pending") ticketCounts.pending += 1;
  });

  console.log("Ticket counts:", ticketCounts);

  // Calculate percentage change
  const calculateChange = (current, previous) => {
    if (previous === 0) return current > 0 ? "+100%" : "0%"; // Handle edge case
    const change = ((current - previous) / previous) * 100;
    return `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
  };

  // Define data for the cards
  const ticketsData = [
    {
      title: "New Tickets",
      count: ticketCounts.new,
      change: calculateChange(ticketCounts.new, previousCounts.new),
      changeColor: ticketCounts.new >= previousCounts.new ? "text-green-500" : "text-red-500",
      progress: (ticketCounts.new / tickets.length) * 100 || 0,
    },
    {
      title: "Solved Tickets",
      count: ticketCounts.solved,
      change: calculateChange(ticketCounts.solved, previousCounts.solved),
      changeColor: ticketCounts.solved >= previousCounts.solved ? "text-green-500" : "text-red-500",
      progress: (ticketCounts.solved / tickets.length) * 100 || 0,
    },
    {
      title: "Open Tickets",
      count: ticketCounts.open,
      change: calculateChange(ticketCounts.open, previousCounts.open),
      changeColor: ticketCounts.open >= previousCounts.open ? "text-green-500" : "text-red-500",
      progress: (ticketCounts.open / tickets.length) * 100 || 0,
    },
    {
      title: "Pending Tickets",
      count: ticketCounts.pending,
      change: calculateChange(ticketCounts.pending, previousCounts.pending),
      changeColor: ticketCounts.pending >= previousCounts.pending ? "text-green-500" : "text-red-500",
      progress: (ticketCounts.pending / tickets.length) * 100 || 0,
    },
  ];

  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {ticketsData.map((ticket, index) => (
          <div key={index} className="card bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">{ticket.title}</span>
              <span className={`font-medium ${ticket.changeColor}`}>
                {ticket.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4">{ticket.count}</h3>
            <div className="relative w-full h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                style={{ width: `${ticket.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketCount;
