"use client";

import { useState } from "react";
import { DEMOS } from "@/lib/constants";
import { DemoLayout, DemoSection } from "@/components/demos/DemoLayout";
import { Button, Card, Badge, Avatar } from "@/components/ui";

const demo = DEMOS.find((d) => d.id === "booking-system")!;

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"
];

const services = [
  { id: 1, name: "Strategy Consultation", duration: "60 min", price: 150, icon: "💡" },
  { id: 2, name: "Design Review", duration: "30 min", price: 75, icon: "🎨" },
  { id: 3, name: "Technical Audit", duration: "90 min", price: 200, icon: "🔧" },
  { id: 4, name: "Quick Check-in", duration: "15 min", price: 0, icon: "☕" },
];

const upcomingBookings = [
  { id: 1, client: "Sarah Johnson", service: "Strategy Consultation", date: "Dec 5", time: "10:00 AM", status: "confirmed" },
  { id: 2, client: "Mike Chen", service: "Design Review", date: "Dec 5", time: "2:30 PM", status: "confirmed" },
  { id: 3, client: "Emma Davis", service: "Technical Audit", date: "Dec 6", time: "11:00 AM", status: "pending" },
];

export default function BookingDemo() {
  const [view, setView] = useState<"calendar" | "book" | "manage">("calendar");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [step, setStep] = useState(1);

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  const handleBook = () => {
    alert("Booking confirmed! (Demo)");
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedService(null);
    setView("calendar");
  };

  return (
    <DemoLayout demo={demo}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📅</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">BookEase</h1>
            <p className="text-gray-600">Smart appointment scheduling</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(["calendar", "book", "manage"] as const).map((v) => (
            <Button key={v} variant={view === v ? "primary" : "secondary"} size="sm" onClick={() => setView(v)}>
              {v === "calendar" ? "Calendar" : v === "book" ? "Book Now" : "Manage"}
            </Button>
          ))}
        </div>
      </div>

      {view === "calendar" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {today.toLocaleString("default", { month: "long", year: "numeric" })}
              </h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">←</Button>
                <Button variant="ghost" size="sm">→</Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday = day === today.getDate();
                const hasBooking = [5, 6, 12, 15, 20].includes(day);
                const isPast = day < today.getDate();
                
                return (
                  <button
                    key={day}
                    disabled={isPast}
                    onClick={() => { setSelectedDate(day); setView("book"); }}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all ${
                      isToday ? "bg-violet-600 text-white" :
                      isPast ? "text-gray-300 cursor-not-allowed" :
                      hasBooking ? "bg-violet-100 text-violet-700 hover:bg-violet-200" :
                      "hover:bg-gray-100"
                    }`}
                  >
                    {day}
                    {hasBooking && !isToday && <div className="w-1 h-1 rounded-full bg-violet-500 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Upcoming */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Upcoming Bookings</h3>
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900">{booking.client}</p>
                    <Badge variant={booking.status === "confirmed" ? "success" : "warning"}>{booking.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{booking.service}</p>
                  <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4" onClick={() => setView("manage")}>View All</Button>
          </Card>
        </div>
      )}

      {view === "book" && (
        <div className="max-w-2xl mx-auto">
          {/* Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                  step >= s ? "bg-violet-600 text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-violet-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          <Card>
            {step === 1 && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Select a Service</h2>
                <div className="space-y-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => { setSelectedService(service.id); setStep(2); }}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all flex items-center gap-4 ${
                        selectedService === service.id ? "border-violet-500 bg-violet-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-3xl">{service.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{service.name}</p>
                        <p className="text-sm text-gray-500">{service.duration}</p>
                      </div>
                      <p className="font-bold text-gray-900">{service.price > 0 ? `$${service.price}` : "Free"}</p>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Pick a Time</h2>
                  <button onClick={() => setStep(1)} className="text-violet-600 text-sm hover:underline">← Back</button>
                </div>
                <p className="text-gray-600 mb-4">
                  {selectedDate ? `December ${selectedDate}, 2024` : "Select a date"}
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((time) => {
                    const isAvailable = !["10:30 AM", "2:00 PM"].includes(time);
                    return (
                      <button
                        key={time}
                        disabled={!isAvailable}
                        onClick={() => { setSelectedTime(time); setStep(3); }}
                        className={`p-3 rounded-lg text-sm font-medium transition-all ${
                          selectedTime === time ? "bg-violet-600 text-white" :
                          isAvailable ? "bg-gray-100 hover:bg-violet-100 text-gray-700" :
                          "bg-gray-50 text-gray-300 cursor-not-allowed"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Confirm Booking</h2>
                  <button onClick={() => setStep(2)} className="text-violet-600 text-sm hover:underline">← Back</button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl">{services.find((s) => s.id === selectedService)?.icon}</span>
                    <div>
                      <p className="font-bold text-gray-900">{services.find((s) => s.id === selectedService)?.name}</p>
                      <p className="text-sm text-gray-500">{services.find((s) => s.id === selectedService)?.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Date & Time</span>
                    <span className="font-medium">Dec {selectedDate}, 2024 at {selectedTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600">Price</span>
                    <span className="font-bold text-lg">${services.find((s) => s.id === selectedService)?.price || 0}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleBook}>
                  Confirm Booking
                </Button>
              </>
            )}
          </Card>
        </div>
      )}

      {view === "manage" && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">All Bookings</h2>
            <div className="flex gap-2">
              <Badge variant="success">Confirmed: 8</Badge>
              <Badge variant="warning">Pending: 2</Badge>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Client</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Service</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Date & Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {upcomingBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-900">{b.client}</td>
                    <td className="px-4 py-4 text-gray-600">{b.service}</td>
                    <td className="px-4 py-4 text-gray-600">{b.date} at {b.time}</td>
                    <td className="px-4 py-4"><Badge variant={b.status === "confirmed" ? "success" : "warning"}>{b.status}</Badge></td>
                    <td className="px-4 py-4">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-600">Cancel</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </DemoLayout>
  );
}
