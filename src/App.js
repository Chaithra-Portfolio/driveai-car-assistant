import React, { useState, useRef } from "react";
import "./App.css";

function App() {

  const allCars = [
    { name: "Swift", type: "Hatchback", price: 600000 },
    { name: "Creta", type: "SUV", price: 1200000 },
    { name: "City", type: "Sedan", price: 1100000 },
    { name: "Thar", type: "SUV", price: 1500000 }
  ];

  const [cars, setCars] = useState(allCars);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const [currency, setCurrency] = useState("INR");
  const [selectedCar, setSelectedCar] = useState("");
  const [compareCars, setCompareCars] = useState([]);

  const [userName, setUserName] = useState("");
  const [carName, setCarName] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [bookingMsg, setBookingMsg] = useState("");
  const [activeFeature, setActiveFeature] = useState("");

  const compareRef = useRef(null);

  const convertPrice = (price) => {
  if (currency === "USD") {
    return `$${(price / 83).toFixed(2)}`;
  } else {
    return `₹${price}`;
  }
};

  // 🔥 UPDATED CHATBOT FUNCTION
  const handleCommand = () => {
    const text = input.toLowerCase().trim();

    let response = "I didn't understand. Try asking about cars 🚗";

    // SHOW ALL
    if (
      text.includes("all cars") ||
      text.includes("show all") ||
      text.includes("vehicles") ||
      text.includes("everything") ||
      text.includes("show me cars") ||        
      text.includes("list cars") ||  
      text.includes("available cars")
    ) {
      setCars(allCars);
      response = "Here are all available cars 🚗";
      document.querySelector(".left")?.scrollIntoView({ behavior: "smooth" });
    }

    // SUV
    else if (text.includes("suv") || text.includes("big car") || text.includes("family car") ||         // ✅ ADDED
    text.includes("large car") ) {
      setCars(allCars.filter(c => c.type === "SUV"));
      response = "Showing SUV cars 🚙";
      document.querySelector(".left")?.scrollIntoView({ behavior: "smooth" });
    }

    // SEDAN
    else if (text.includes("sedan")) {
      setCars(allCars.filter(c => c.type === "Sedan"));
      response = "Showing sedan cars 🚘";
      document.querySelector(".left")?.scrollIntoView({ behavior: "smooth" });
    }

    // HATCHBACK
    else if (text.includes("hatchback")) {
      setCars(allCars.filter(c => c.type === "Hatchback"));
      response = "Showing hatchback cars 🚗";
      document.querySelector(".left")?.scrollIntoView({ behavior: "smooth" });
    }

    // BUDGET
    else if (
      text.includes("10") ||
      text.includes("ten") ||
      text.includes("budget") ||
      text.includes("cheap") ||              
      text.includes("low price") 
    ) {
      setCars(allCars.filter(c => c.price <= 1000000));
      response = "Showing budget-friendly cars under 10 lakh 💰";
      document.querySelector(".left")?.scrollIntoView({ behavior: "smooth" });
    }

    else if (text.includes("family")) {
  const familyCar = allCars.find(c => c.type === "SUV");
  setSelectedCar(familyCar.name);
  response = `${familyCar.name} is best for family 👨‍👩‍👧‍👦`;
}

else if (text.includes("suv") && text.includes("10")) {
  const filtered = allCars.filter(
    c => c.type === "SUV" && c.price <= 1000000
  );
  setCars(filtered);
  response = "SUV cars under 10 lakh 💰";
}

    
    // 🔹 FEATURE CONTROL (UPDATED ONLY)
else if (text.includes("safety")) {
  setActiveFeature("safety");
  response = "Safety features include airbags, ABS, and strong body 🛡️";
  document.querySelector(".feature-grid")?.scrollIntoView({ behavior: "smooth" });
}

else if (text.includes("mileage")) {
  setActiveFeature("mileage");
  response = "Mileage features help save fuel and improve efficiency ⛽";
  document.querySelector(".feature-grid")?.scrollIntoView({ behavior: "smooth" });
}

else if (text.includes("comfort")) {
  setActiveFeature("comfort");
  response = "Comfort features include spacious seating and smooth ride 🛋️";
  document.querySelector(".feature-grid")?.scrollIntoView({ behavior: "smooth" });
}

else if (text.includes("features") ||text.includes("features of car") ||  
  text.includes("car features") || text.includes("what features")  ) {
  setActiveFeature("");
  response = "Here are the key features of our cars 🚗";
  document.querySelector(".feature-grid")?.scrollIntoView({ behavior: "smooth" });
}

    else if (
  text.includes("compare all") ||
  text.includes("all cars compare")
) {
  setCompareCars(allCars);
  response = "Comparing all cars 📊";
  compareRef.current?.scrollIntoView({ behavior: "smooth" });
}

else if (
  text.includes("compare") ||
  text.includes("difference") ||
  text.includes("best cars") ||          
  text.includes("top cars") || 
  text.includes("compare cars")
  
) {
  const sorted = [...allCars].sort((a, b) => b.price - a.price);
  setCompareCars([sorted[0], sorted[1]]);
  response = "Comparing top 2 cars 📊";
  compareRef.current?.scrollIntoView({ behavior: "smooth" });
}

    // CURRENCY
    else if (text.includes("dollar") || text.includes("usd") || text.includes("price in dollar") ||    // ✅ ADDED
    text.includes("convert to usd")) {
      setCurrency("USD");
      response = "Prices updated to dollars 💲";
    }

    else if (text.includes("rupee") || text.includes("inr") || text.includes("price in rupees") ||    // ✅ ADDED
  text.includes("convert to inr") ) {
      setCurrency("INR");
      response = "Prices updated to rupees ₹";
    }

    // BOOKING (SMART AUTO-FILL)
    else if (text.includes("book") || text.includes("test drive") || text.includes("schedule") ) {
      document.querySelector(".booking-box")?.scrollIntoView({ behavior: "smooth" });
      response = "You can book your test drive below 📝";

      if (text.includes("thar")) setCarName("Thar");
      if (text.includes("creta")) setCarName("Creta");
      if (text.includes("city")) setCarName("City");
      if (text.includes("swift")) setCarName("Swift");

      if (text.includes("mysore")) setCity("Mysore");
      if (text.includes("bangalore")) setCity("Bangalore");

      if (text.includes("monday")) setDate("Monday");
      if (text.includes("tuesday")) setDate("Tuesday");
      if (text.includes("wednesday")) setDate("Wednesday");
      if (text.includes("thursday")) setDate("Thursday");
      if (text.includes("friday")) setDate("Friday");
      if (text.includes("saturday")) setDate("Saturday");
      if (text.includes("sunday")) setDate("Sunday");
    }

    // GENERAL AI RESPONSES
    else if (text.includes("best car")) {
      response = "For families, SUV like Creta is a great choice 👍";
    }

    else if (text.includes("hello") || text.includes("hi")) {
      response = "Hello! I can help you explore cars 🚗";
    }

    else if (text.includes("help")) {
      response = "Try: show SUVs, compare cars, or book test drive 😊";
    }

    setMessage(response);
    setInput("");
  };

  const handleBooking = () => {
    if (!userName || !carName || !city || !date) {
      setBookingMsg("⚠️ Fill all details");
      return;
    }

    const validCar = allCars.find(
      c => c.name.toLowerCase() === carName.toLowerCase()
    );

    if (!validCar) {
      setBookingMsg("❌ Car not found");
      return;
    }

    const validDays = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
    const isValidDay = validDays.includes(date.toLowerCase());
    const isValidDateFormat = /^\d{4}-\d{2}-\d{2}$/.test(date);

    if (!isValidDay && !isValidDateFormat) {
      setBookingMsg("❌ Enter valid date");
      return;
    }

    setBookingMsg(`✅ Booked ${carName} in ${city} on ${date}`);
  };

  return (
    <div className="container">

      <div className="header-box">
  <h1>🚗 DriveAI Car Assistant</h1>

  <div className="scroll-text">
    <h2>Smart AI powered car exploration</h2>
  </div>

  {/* 🔥 ADD THIS BUTTON */}
  <button
    onClick={() => {
      document.querySelector(".main-layout")?.scrollIntoView({
        behavior: "smooth",
      });
    }}
  >
    Explore Cars
  </button>
</div>

      <div className="main-layout">

        <div className="left">
          <h2>Available Cars</h2>

          {cars.map((car) => (
            <div
              key={car.name}
              className="card"
              onClick={() => setSelectedCar(car.name)}
              style={{
                border: car.name === selectedCar ? "3px solid green" : ""
              }}
            >
              <h3>{car.name}</h3>
              <p>{car.type}</p>
              <p>{convertPrice(car.price)}</p>
              
            </div>
          ))}
        </div>

        <div className="right">
          <h2>Smart AI Assistant</h2>

          <div className="chat-box">
            {message || "Try: show all cars"}
          </div>

          <div className="search-box">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand()}
              placeholder="Ask anything..."
            />
            <button onClick={handleCommand}>Search</button>
          </div>
        </div>

      </div>
      

      <div className="section-container">

        <div ref={compareRef} className="section">
          <h2 className="section-title">Compare Cars</h2>

          {compareCars.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                {compareCars.map((car) => (
                  <tr key={car.name}>
                    <td>{car.name}</td>
                    <td>{car.type}</td>
                    <td>₹{car.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="section">
  <h2 className="section-title">Features</h2>

  <div className="feature-grid">

    <div
  className="feature-card"
  style={{
    border: activeFeature === "safety" ? "3px solid yellow" : ""
  }}
>
  <h3>🛡️ Safety</h3>

  {/* ✅ Tooltip style */}
  <div className="feature-info">
    Airbags, ABS, strong body protection
  </div>
</div>

    <div
  className="feature-card"
  style={{
    border: activeFeature === "mileage" ? "3px solid yellow" : ""
  }}
>
  <h3>⛽ Mileage</h3>

  {/* ✅ ADD THIS */}
  <p className="feature-info">
    High fuel efficiency and low fuel consumption
  </p>
</div>

    <div
  className="feature-card"
  style={{
    border: activeFeature === "comfort" ? "3px solid yellow" : ""
  }}
>
  <h3>🛋️ Comfort</h3>

  {/* ✅ ADD THIS */}
  <p className="feature-info">
    Spacious seating and smooth driving experience
  </p>
</div>

  </div>
</div>
  

        <div className="section">
          <h2 className="section-title">Book Test Drive</h2>

          <div className="booking-wrapper">
            <div className="booking-box">
              <input placeholder="Your name" value={userName} onChange={(e)=>setUserName(e.target.value)} />
              <input placeholder="Car name" value={carName} onChange={(e)=>setCarName(e.target.value)} />
              <input placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} />
              <input placeholder="Date" value={date} onChange={(e)=>setDate(e.target.value)} />
              <button onClick={handleBooking}>Book Now</button>
            </div>

            {bookingMsg && (
              <p className="booking-message" style={{
                color: bookingMsg.includes("❌") ? "red" : "green"
              }}>
                {bookingMsg}
              </p>
            )}
          </div>
        </div>

        <div className="section">
  <h2 className="contact-title">Contact</h2>
  <p className="contact-text">Email: driveai@gmail.com</p>
  <p className="contact-text">Phone: 9876543210</p>
</div>

      </div>

    </div>
  );
}

export default App;