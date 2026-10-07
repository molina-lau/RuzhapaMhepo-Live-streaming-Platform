import { EventsTimeTable } from "@/types/types";
export function DecodeEvents(list: EventsTimeTable[]): EventsTimeTable[] {
  const date = new Date();
  const weeks: EventsTimeTable[] = Array.from(
    { length: 7 },
    () => ({ week: -1, event: [] } as unknown as EventsTimeTable)
  );
  for (let i = 0; i < list.length; i++) {
    const event = list[i];
    if (weeks[event.week].week < 0) {
      weeks[event.week] = event;
    } else {
      weeks[event.week]!.event.push(...event.event);
      weeks[event.week]!.event.sort((a, b) => a.startTime - b.startTime);
    }
    event.event.sort((a, b) => a.endTime - b.endTime);
    event.event = event.event.filter((e) => {
    const currentDate = new Date(e.endTime*1000)
      return currentDate >= date;
    });
  }
  return weeks;
}
