import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReservationForm({ selectedItems = [], onUpdateItem }) {
  const [date, setDate] = useState(null); // <-- date state for DatePicker

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + parseFloat(item.price.slice(1)) * item.quantity,
    0
  );

  return (
    <section id="reserve" className="py-8 px-4 sm:px-6 container mx-auto">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">Reserve a Table</h2>
        <p className="text-sm sm:text-base text-slate-600 mb-4">
          Fill your details and we'll confirm via email.
        </p>

        <form
          action="https://formsubmit.co/astitavmittal@gmail.com"
          method="POST"
          className="space-y-4"
        >
          {/* Hidden fields */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="CafeRapture Reservation" />

          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full border p-2 sm:p-3 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full border p-2 sm:p-3 rounded-xl"
                required
              />
            </div>

            {/* Mobile-friendly DatePicker */}
            <div>
              <label className="block text-sm mb-1">Date</label>
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                minDate={new Date()}
                placeholderText="Select a date"
                className="w-full border p-3 rounded-xl h-12 text-sm"
                required
                showMonthDropdown        // dropdown for months
                showYearDropdown         // dropdown for years
                dropdownMode="select"    // makes the dropdown selectable
              />
              {/* Hidden input to submit date */}
              <input
                type="hidden"
                name="date"
                value={date ? date.toISOString().split("T")[0] : ""}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Time</label>
              <div className="flex gap-2 flex-wrap">
                <select name="hour" required className="border p-2 sm:p-3 rounded flex-1 min-w-[70px]">
                  <option value="">Hour</option>
                  {[...Array(12).keys()].map((h) => (
                    <option key={h + 1} value={h + 1}>{h + 1}</option>
                  ))}
                </select>
                <select name="minute" required className="border p-2 sm:p-3 rounded flex-1 min-w-[70px]">
                  <option value="">Minute</option>
                  <option>00</option>
                  <option>15</option>
                  <option>30</option>
                  <option>45</option>
                </select>
                <select name="ampm" required className="border p-2 sm:p-3 rounded w-20">
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Guests</label>
              <input
                type="number"
                name="guests"
                min="1"
                defaultValue="2"
                className="w-full border p-2 sm:p-3 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Seating Preference</label>
              <select name="area" className="w-full border p-2 sm:p-3 rounded-xl">
                <option value="">(optional)</option>
                <option>Indoor</option>
                <option>Outdoor</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Phone Number</label>
              <div className="flex gap-2 flex-wrap">
                <select name="country_code" required className="border p-2 sm:p-3 rounded w-28">
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+91">+91 (India)</option>
                  <option value="+61">+61 (Australia)</option>
                  <option value="+81">+81 (Japan)</option>
                  <option value="+971">+971 (UAE)</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  pattern="[0-9]{10}"
                  placeholder="10-digit phone"
                  className="border p-2 sm:p-3 rounded flex-1 min-w-[120px]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm mb-1">Special Requests</label>
            <textarea
              name="message"
              rows="4"
              className="w-full border p-2 sm:p-3 rounded-xl"
              placeholder="Allergies, celebration, etc."
            ></textarea>
          </div>

          {/* Pre-order Items */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">Pre-Order Items</h3>
            {selectedItems.length > 0 ? (
              <div className="flex flex-col gap-2 max-h-40 sm:max-h-60 overflow-y-auto">
                {selectedItems.map((item) => {
                  const totalPerItem = parseFloat(item.price.slice(1)) * item.quantity;
                  return (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b pb-1"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          {item.quantity} x {item.price} = ${totalPerItem.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          type="button"
                          onClick={() => onUpdateItem(item, item.quantity - 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateItem(item, item.quantity + 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 italic text-sm">No items selected yet. Add from the menu above.</p>
            )}
            <input
              type="hidden"
              name="preorder"
              value={selectedItems.map((i) => `${i.name} x${i.quantity}`).join(", ")}
            />
          </div>

          {/* Subtotal */}
          <div className="mt-4 flex justify-between font-semibold text-gray-800 text-sm sm:text-base">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {/* Submit */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600"
            >
              Request Reservation
            </button>
            <div className="text-xs sm:text-sm text-slate-500 mt-2 sm:mt-0">
              We will email confirmation within 24 hours.
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
