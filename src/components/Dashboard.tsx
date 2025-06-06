import React, { useState, useEffect } from 'react';
import { TableSkeleton, PageHeaderSkeleton } from './ui/skeleton';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../pages/User';

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

// Mobile Card Component for Staff Members
const StaffCard: React.FC<{ member: StaffMember }> = ({ member }) => {
  const shiftDetails = getShiftDetails(member.shiftType);

  return (
    <div className='bg-white border rounded-lg p-4 space-y-3'>
      <div className='flex items-center gap-3'>
        <img
          src={member.avatar}
          alt={member.name}
          className='h-10 w-10 rounded-full flex-shrink-0'
        />
        <div className='flex-1 min-w-0'>
          <h3 className='font-medium text-gray-900 truncate'>{member.name}</h3>
          <p className='text-sm text-gray-500 truncate'>{member.role}</p>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            member.status === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {member.status}
        </span>
      </div>

      {shiftDetails && (
        <div className='bg-gray-50 rounded-md p-3'>
          <div className='flex justify-between items-center'>
            <span className='font-medium text-sm'>{shiftDetails.name}</span>
            <span className='text-sm text-gray-600'>
              {formatTime(shiftDetails.startTime)} -{' '}
              {formatTime(shiftDetails.endTime)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const StaffTable: React.FC<{ data: StaffMember[] }> = ({ data }) => {
  return (
    <>
      {/* Desktop Table View */}
      <div className='hidden md:block rounded-lg border overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b bg-gray-50'>
                <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                  Staff Member
                </th>
                <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                  Role
                </th>
                <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                  Shift
                </th>
                <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {data.map((member) => {
                const shiftDetails = getShiftDetails(member.shiftType);
                return (
                  <tr key={member.id} className='hover:bg-gray-50'>
                    <td className='px-4 py-3'>
                      <div className='flex items-center gap-3'>
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className='h-8 w-8 rounded-full flex-shrink-0'
                        />
                        <span className='font-medium text-gray-900'>
                          {member.name}
                        </span>
                      </div>
                    </td>
                    <td className='px-4 py-3 text-gray-600'>{member.role}</td>
                    <td className='px-4 py-3'>
                      <div>
                        <div className='font-medium text-gray-900'>
                          {shiftDetails?.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {shiftDetails &&
                            `${formatTime(
                              shiftDetails.startTime
                            )} - ${formatTime(shiftDetails.endTime)}`}
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-3'>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
      </div>

      {/* Mobile Card View */}
      <div className='md:hidden space-y-3'>
        {data.map((member) => (
          <StaffCard key={member.id} member={member} />
        ))}
      </div>
    </>
  );
};

// Admin Dashboard Component
const AdminDashboard: React.FC = () => {
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
      <div className='p-4 sm:p-6'>
        <PageHeaderSkeleton />

        <div className='space-y-6 sm:space-y-8'>
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
    <div className='p-4 sm:p-6'>
      <div className='mb-6 sm:mb-8'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
          Admin Dashboard
        </h1>
        <p className='text-gray-600 mt-1'>Overview of your staff and shifts</p>
      </div>

      <div className='space-y-6 sm:space-y-8'>
        <section>
          <h2 className='mb-4 text-lg sm:text-xl font-semibold text-gray-900'>
            Today's Schedule
          </h2>
          <StaffTable data={todaySchedule} />
        </section>

        <section>
          <h2 className='mb-4 text-lg sm:text-xl font-semibold text-gray-900'>
            Upcoming Shifts
          </h2>
          <StaffTable data={upcomingShifts} />
        </section>
      </div>
    </div>
  );
};

// Main Dashboard Component with Role-Based Rendering
export const Dashboard: React.FC = () => {
  const { isAdmin, user } = useAuth();

  // If user is admin, show full dashboard
  if (isAdmin) {
    return <AdminDashboard />;
  }

  // If user is regular user, show user profile page
  return (
    <div>
      <div className='p-4 sm:p-6 border-b bg-gray-50'>
        <h1 className='text-xl sm:text-2xl font-bold text-gray-900'>
          Welcome, {user?.name}!
        </h1>
        <p className='text-gray-600 mt-1'>
          Manage your profile and view your information
        </p>
      </div>
      <User />
    </div>
  );
};
