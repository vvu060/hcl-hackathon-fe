import React, { useState, useEffect } from 'react';
import { TableSkeleton, PageHeaderSkeleton } from './ui/skeleton';

interface ShiftType {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  description: string;
}

// Predefined shift types (same as in Schedule.tsx)
const shiftTypes: ShiftType[] = [
  {
    id: '1',
    name: 'Morning Shift',
    startTime: '06:00',
    endTime: '14:00',
    description: '8-hour morning shift',
  },
  {
    id: '2',
    name: 'Day Shift',
    startTime: '08:00',
    endTime: '16:00',
    description: '8-hour day shift',
  },
  {
    id: '3',
    name: 'Evening Shift',
    startTime: '14:00',
    endTime: '22:00',
    description: '8-hour evening shift',
  },
  {
    id: '4',
    name: 'Night Shift',
    startTime: '22:00',
    endTime: '06:00',
    description: '8-hour night shift',
  },
  {
    id: '5',
    name: 'Extended Day',
    startTime: '07:00',
    endTime: '19:00',
    description: '12-hour day shift',
  },
  {
    id: '6',
    name: 'Extended Night',
    startTime: '19:00',
    endTime: '07:00',
    description: '12-hour night shift',
  },
];

interface StaffMember {
  id: string;
  name: string;
  role: string;
  shiftType: string; // Reference to shift type ID
  date: string;
  status: 'Active' | 'Scheduled';
  avatar: string;
}

// Helper function to get shift details
const getShiftDetails = (shiftTypeId: string) => {
  return shiftTypes.find((shift) => shift.id === shiftTypeId);
};

// Helper function to format time from 24h to 12h format
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

const todaySchedule: StaffMember[] = [
  {
    id: '1',
    name: 'Dr. Amelia Harper',
    role: 'Cardiologist',
    shiftType: '2', // Day Shift
    date: new Date().toISOString().split('T')[0], // Today
    status: 'Active',
    avatar: 'https://avatar.iran.liara.run/public/4',
  },
  {
    id: '2',
    name: 'Ethan Bennett',
    role: 'Registered Nurse',
    shiftType: '3', // Evening Shift
    date: new Date().toISOString().split('T')[0], // Today
    status: 'Active',
    avatar: 'https://avatar.iran.liara.run/public/4',
  },
  {
    id: '3',
    name: 'Olivia Carter',
    role: 'Nurse Practitioner',
    shiftType: '2', // Day Shift
    date: new Date().toISOString().split('T')[0], // Today
    status: 'Active',
    avatar: 'https://avatar.iran.liara.run/public/4',
  },
];

const upcomingShifts: StaffMember[] = [
  {
    id: '4',
    name: 'Dr. Liam Foster',
    role: 'Surgeon',
    shiftType: '5', // Extended Day
    date: new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0], // Tomorrow
    status: 'Scheduled',
    avatar: 'https://avatar.iran.liara.run/public/4',
  },
  {
    id: '5',
    name: 'Sophia Evans',
    role: 'Registered Nurse',
    shiftType: '4', // Night Shift
    date: new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0], // Tomorrow
    status: 'Scheduled',
    avatar: 'https://avatar.iran.liara.run/public/6',
  },
  {
    id: '6',
    name: 'Noah Graham',
    role: 'Nurse Practitioner',
    shiftType: '1', // Morning Shift
    date: new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0], // Tomorrow
    status: 'Scheduled',
    avatar: 'https://avatar.iran.liara.run/public/5',
  },
];

const StaffTable: React.FC<{ data: StaffMember[] }> = ({ data }) => {
  return (
    <div className='rounded-lg border'>
      <table className='w-full'>
        <thead>
          <tr className='border-b bg-gray-50'>
            <th className='px-4 py-2 text-left'>Staff Member</th>
            <th className='px-4 py-2 text-left'>Role</th>
            <th className='px-4 py-2 text-left'>Shift</th>
            <th className='px-4 py-2 text-left'>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((member) => {
            const shiftDetails = getShiftDetails(member.shiftType);
            return (
              <tr key={member.id} className='border-b last:border-0'>
                <td className='px-4 py-2'>
                  <div className='flex items-center gap-2'>
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className='h-8 w-8 rounded-full'
                    />
                    <span>{member.name}</span>
                  </div>
                </td>
                <td className='px-4 py-2 text-gray-600'>{member.role}</td>
                <td className='px-4 py-2'>
                  <div>
                    <div className='font-medium'>{shiftDetails?.name}</div>
                    <div className='text-sm text-gray-500'>
                      {shiftDetails &&
                        `${formatTime(shiftDetails.startTime)} - ${formatTime(
                          shiftDetails.endTime
                        )}`}
                    </div>
                  </div>
                </td>
                <td className='px-4 py-2'>
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-sm ${
                      member.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate 1.5 second loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className='p-6'>
        <PageHeaderSkeleton />

        <div className='space-y-8'>
          <section>
            <div className='mb-4'>
              <div className='h-6 w-[200px] bg-gray-200 rounded animate-pulse'></div>
            </div>
            <TableSkeleton rows={3} columns={4} />
          </section>

          <section>
            <div className='mb-4'>
              <div className='h-6 w-[180px] bg-gray-200 rounded animate-pulse'></div>
            </div>
            <TableSkeleton rows={3} columns={4} />
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p className='text-gray-600'>Overview of your staff and shifts</p>
      </div>

      <div className='space-y-8'>
        <section>
          <h2 className='mb-4 text-xl font-semibold'>Today's Schedule</h2>
          <StaffTable data={todaySchedule} />
        </section>

        <section>
          <h2 className='mb-4 text-xl font-semibold'>Upcoming Shifts</h2>
          <StaffTable data={upcomingShifts} />
        </section>
      </div>
    </div>
  );
};
