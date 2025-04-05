interface BoycottDates {
  startDate: string;
  currentDate: string;
  daysPassed: number;
  nextDate: string;
}

export interface BoycottEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
}

export async function fetchBoycottDates(): Promise<BoycottDates> {
  try {
    const response = await fetch('https://boykot.grkn.dev/api/date');
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching boycott dates:', error);
    throw error;
  }
}

// Convert API data to BoycottEvent objects
export function getBoycottEvents(data: BoycottDates): BoycottEvent[] {
  // Create an event for the next boycott date
  const nextBoycottDate = new Date(data.nextDate);
  
  return [
    {
      id: 'next-boycott',
      date: nextBoycottDate,
      title: 'Haftada 1 Boykot',
      description: 'Boykot günü etkinliğimize katılın!'
    }
  ];
} 