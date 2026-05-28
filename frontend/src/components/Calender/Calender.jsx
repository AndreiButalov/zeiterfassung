import { useState } from "react";
import "./Calender.css"

const Calender = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

  const startOfWeek = (date) => {
    const day = (date.getDay() + 6) % 7;
    const copy = new Date(date);
    copy.setDate(date.getDate() - day);
    copy.setHours(0, 0, 0, 0);
    return copy;
  };

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const goToday = () => {
    const today = new Date();
    setViewDate(today);
    setSelectedDate(today);
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    // setModalOpen(true);
  };

//   const closeModal = () => {
//     // setModalOpen(false);
//   };

  const renderDays = () => {
    const month = viewDate.getMonth();
    const start = startOfWeek(new Date(viewDate.getFullYear(), month, 1));
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);

      let classes = "btn btn-light btn-sm";
      if (d.getMonth() !== month) classes += " text-muted";
      if (d.getTime() === today.getTime())
        classes = "btn btn-primary btn-sm text-white";
      if (selectedDate && d.toDateString() === selectedDate.toDateString())
        classes = "btn btn-warning btn-sm text-white";

      days.push(
        <button
          key={i}
          className={classes}
          onClick={() => handleDayClick(d)}
        >
          {d.getDate()}
        </button>
      );
    }
    return days;
  };

  const monthNames = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember",
  ];

  return (
    <div className="container">
      <div className="calender_content">
        <div>
          <div >
            <button onClick={prevMonth}>
              ◀
            </button>
            <button onClick={nextMonth}>
              ▶
            </button>
          </div>
          <h5>
            {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
          </h5>
          <button onClick={goToday}>
            Heute
          </button>
        </div>

        <div className="calender_days">
          <div>Mo</div>
          <div>Di</div>
          <div>Mi</div>
          <div>Do</div>
          <div>Fr</div>
          <div>Sa</div>
          <div>So</div>
        </div>

        <div className="calender_days_data">
          {renderDays()}
        </div>
      </div>

      {/* Day Modal */}
      {/* <Day date={selectedDate} show={modalOpen} onClose={closeModal} /> */}
    </div>
  );
};

export default Calender;