import './App.css';
import React, { useState, useEffect } from 'react';
import axios from "axios"
import DateTimePicker from 'react-datetime-picker';

function App() {

  const [reminderMsg, setReminderMsg] = useState("")
  const [remindAt, setRemindAt] = useState()
  const [reminderList, setReminderList] = useState([])

  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/allreminder").then(res => setReminderList(res.data.reminder))
  }, [])


  const addReminder = () => {
    axios.post("http://localhost:4000/api/v1/create/reminder", { reminderMsg, remindAt })
      .then(res => setReminderList(res.data.reminder))
    setRemindAt()
    setReminderMsg("")
    window.location.reload(true)

  }
  const deleteReminder = (id) => {
    console.log(id)
    axios.delete(`http://localhost:4000/api/v1/reminder/delete/${id}`)
      .then(res => setReminderList(res.data.reminder))
    window.location.reload(true)

  }


  return (
    <div className="App">
      <div className="homepage">
        <div className="homepage_header">
          <h1>Remind me</h1>

          <input type="text" placeholder='Reminder notes here...' value={reminderMsg} onChange={e => setReminderMsg(e.target.value)}
          />
          <DateTimePicker
            value={remindAt}
            onChange={setRemindAt}
            minDate={new Date()}
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="dd"
            monthPlaceholder="mm"
            yearPlaceholder="yyyy"
          />
          <div className="button" onClick={addReminder}>Add Reminder</div>
        </div>

        <div className="homepage_body">
          {
            reminderList.map(reminder => (
              <div className="reminder_card" key={reminder._id}>
                <h2>{reminder.reminderMsg}</h2>
                <h3>Remind Me at:</h3>
                <p>{String(new Date(reminder.remindAt.toLocaleString(undefined, { timezone: "Asia/Kolkata" })))}</p>
                <div className="button" onClick={() => deleteReminder(reminder._id)}>Delete</div>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  );
}

export default App;
