import { EventsTimeTable} from "@/types/types";
import { getTimeString } from "@/utils/time-ops";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Friday",
  "Tuesday",
  "Saturday",
  "Thursday",
  "Wednesday",
];
export default function TimeTable({
  events,
}: {
  events: EventsTimeTable[];
}) {
  const scheduleVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };
  const [week, selectedWeek] = useState(1);
  useEffect(() => {
    selectedWeek(new Date().getDay());
  }, []);
  return (
    <>
      <div className="bg-white/90 rounded-xl  p-6">
        <div className="flex flex-col items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {week == new Date().getDay() ? "Today" : daysOfWeek[week]}&apos;s
            Schedule
          </h2>
          <select
            className="p-3 border-0 outline-0 cursor-pointer bg-slate-100 w-full rounded-4xl"
            value={week}
            onChange={(e) => selectedWeek(parseInt(e.target.value))}
          >
            {daysOfWeek.map((e, i) => (
              <option key={i} value={i}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <AnimatePresence>
          {
            <div className="space-y-2">
              {events[week].week < 0 && (
                <motion.div
                  variants={scheduleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="p-3 rounded-lg bg-white/90 border border-gray-200 shadow-md border-dashed mb-2"
                >
                   <p className="text-gray-500 text-sm">
                    No events for {daysOfWeek[week]}.
                  </p>
                </motion.div>
              )}{" "}
              {events[week].week >= 0 && (
                <>
                  {events[week].event.map((e, i) => (
                    <motion.div
                      key={i}
                      variants={scheduleVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="p-3 rounded-lg bg-white/90 border  shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-400/50 mb-2"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 " >
                        <h3 className="text-md font-semibold text-gray-900 mb-1 sm:mb-0">
                          {getTimeString(e.startTime)}
                        </h3>
                        <span className="text-sm text-gray-600">
                          {getTimeString(e.startTime)} -{" "}
                          {getTimeString(e.endTime)}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{e.desc}</p>
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          }
        </AnimatePresence>
      </div>
    </>
  );
}

