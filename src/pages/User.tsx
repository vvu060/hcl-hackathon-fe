import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Plus, Edit, X, Calendar, Clock } from 'lucide-react';

interface ShiftType {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  description: string;
}

interface UserShift {
  id: string;
  date: string;
  shiftType: string;
  status: 'Scheduled' | 'Completed' | 'Missed';
}

interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  type: 'Sick' | 'Vacation' | 'Personal' | 'Emergency';
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
  appliedDate: string;
}

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
  workingHours: number;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  employeeId: string;
  joinDate: string;
  avatar: string;
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

// Sample user profile (in real app, this would come from authentication)
const currentUser: UserProfile = {
  id: '1',
  name: 'Dr. Amelia Harper',
  email: 'amelia.harper@hospital.com',
  role: 'Doctor',
  department: 'Cardiology',
  employeeId: 'EMP001',
  joinDate: '2022-03-15',
  avatar: 'https://avatar.iran.liara.run/public/4',
};

// Helper functions
const getShiftDetails = (shiftTypeId: string) => {
  return shiftTypes.find((shift) => shift.id === shiftTypeId);
};

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5); // HH:MM format
};

const calculateWorkingHours = (checkIn: string, checkOut: string) => {
  const [inHours, inMinutes] = checkIn.split(':').map(Number);
  const [outHours, outMinutes] = checkOut.split(':').map(Number);

  const inTime = inHours * 60 + inMinutes;
  const outTime = outHours * 60 + outMinutes;

  return Math.max(0, (outTime - inTime) / 60);
};

export const User: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([
    {
      id: '1',
      date: '2024-01-15',
      checkIn: '08:15',
      checkOut: '16:30',
      status: 'Present',
      workingHours: 8.25,
    },
    {
      id: '2',
      date: '2024-01-14',
      checkIn: '08:45',
      checkOut: '16:15',
      status: 'Late',
      workingHours: 7.5,
    },
    {
      id: '3',
      date: '2024-01-13',
      checkIn: '08:00',
      checkOut: '16:00',
      status: 'Present',
      workingHours: 8,
    },
  ]);

  const [userShifts] = useState<UserShift[]>([
    {
      id: '1',
      date: '2024-01-16',
      shiftType: '2',
      status: 'Scheduled',
    },
    {
      id: '2',
      date: '2024-01-17',
      shiftType: '2',
      status: 'Scheduled',
    },
    {
      id: '3',
      date: '2024-01-18',
      shiftType: '3',
      status: 'Scheduled',
    },
    {
      id: '4',
      date: '2024-01-15',
      shiftType: '2',
      status: 'Completed',
    },
    {
      id: '5',
      date: '2024-01-14',
      shiftType: '2',
      status: 'Completed',
    },
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      type: 'Vacation',
      status: 'Pending',
      reason: 'Family vacation',
      appliedDate: '2024-01-10',
    },
    {
      id: '2',
      startDate: '2024-01-20',
      endDate: '2024-01-20',
      type: 'Sick',
      status: 'Approved',
      reason: 'Medical appointment',
      appliedDate: '2024-01-18',
    },
  ]);

  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceAction, setAttendanceAction] = useState<
    'checkin' | 'checkout'
  >('checkin');

  // Leave management state
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [editingLeave, setEditingLeave] = useState<LeaveRequest | null>(null);
  const [leaveFormData, setLeaveFormData] = useState({
    startDate: '',
    endDate: '',
    type: 'Vacation' as LeaveRequest['type'],
    reason: '',
  });

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendanceRecords.find(
    (record) => record.date === today
  );
  const todayShift = userShifts.find((shift) => shift.date === today);

  const handleAttendance = () => {
    const currentTime = getCurrentTime();
    const newRecord: AttendanceRecord = {
      id: (attendanceRecords.length + 1).toString(),
      date: today,
      checkIn:
        attendanceAction === 'checkin'
          ? currentTime
          : todayAttendance?.checkIn || null,
      checkOut: attendanceAction === 'checkout' ? currentTime : null,
      status: 'Present',
      workingHours: 0,
    };

    if (attendanceAction === 'checkout' && todayAttendance?.checkIn) {
      newRecord.workingHours = calculateWorkingHours(
        todayAttendance.checkIn,
        currentTime
      );
    }

    if (todayAttendance) {
      // Update existing record
      setAttendanceRecords((prev) =>
        prev.map((record) =>
          record.date === today
            ? {
                ...record,
                checkOut:
                  attendanceAction === 'checkout'
                    ? currentTime
                    : record.checkOut,
                workingHours:
                  attendanceAction === 'checkout' && record.checkIn
                    ? calculateWorkingHours(record.checkIn, currentTime)
                    : record.workingHours,
              }
            : record
        )
      );
    } else if (attendanceAction === 'checkin') {
      // Create new record
      setAttendanceRecords((prev) => [...prev, newRecord]);
    }

    setIsAttendanceModalOpen(false);
  };

  // Leave management functions
  const handleLeaveSubmit = () => {
    if (
      !leaveFormData.startDate ||
      !leaveFormData.endDate ||
      !leaveFormData.reason.trim()
    ) {
      return;
    }

    if (editingLeave) {
      // Update existing leave request
      setLeaveRequests((prev) =>
        prev.map((leave) =>
          leave.id === editingLeave.id
            ? {
                ...leave,
                ...leaveFormData,
                status: 'Pending' as const, // Reset status when editing
              }
            : leave
        )
      );
    } else {
      // Create new leave request
      const newLeave: LeaveRequest = {
        id: (leaveRequests.length + 1).toString(),
        ...leaveFormData,
        status: 'Pending',
        appliedDate: today,
      };
      setLeaveRequests((prev) => [...prev, newLeave]);
    }

    // Reset form and close modal
    setLeaveFormData({
      startDate: '',
      endDate: '',
      type: 'Vacation',
      reason: '',
    });
    setEditingLeave(null);
    setIsLeaveModalOpen(false);
  };

  const handleEditLeave = (leave: LeaveRequest) => {
    if (leave.status !== 'Pending') {
      return; // Can only edit pending requests
    }

    setEditingLeave(leave);
    setLeaveFormData({
      startDate: leave.startDate,
      endDate: leave.endDate,
      type: leave.type,
      reason: leave.reason,
    });
    setIsLeaveModalOpen(true);
  };

  const handleCancelLeave = (leaveId: string) => {
    setLeaveRequests((prev) => prev.filter((leave) => leave.id !== leaveId));
  };

  const openNewLeaveModal = () => {
    setEditingLeave(null);
    setLeaveFormData({
      startDate: '',
      endDate: '',
      type: 'Vacation',
      reason: '',
    });
    setIsLeaveModalOpen(true);
  };

  const calculateLeaveDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800';
      case 'Late':
        return 'bg-yellow-100 text-yellow-800';
      case 'Absent':
        return 'bg-red-100 text-red-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Missed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='p-6'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>My Dashboard</h1>
        <p className='text-gray-600'>Welcome back, {currentUser.name}</p>
      </div>

      {/* Profile Overview */}
      {/* <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-4'>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className='h-16 w-16 rounded-full'
            />
            <div className='grid grid-cols-2 gap-4 flex-1'>
              <div>
                <p className='text-sm text-gray-600'>Name</p>
                <p className='font-medium'>{currentUser.name}</p>
              </div>
              <div>
                <p className='text-sm text-gray-600'>Employee ID</p>
                <p className='font-medium'>{currentUser.employeeId}</p>
              </div>
              <div>
                <p className='text-sm text-gray-600'>Role</p>
                <p className='font-medium'>{currentUser.role}</p>
              </div>
              <div>
                <p className='text-sm text-gray-600'>Department</p>
                <p className='font-medium'>{currentUser.department}</p>
              </div>
              <div>
                <p className='text-sm text-gray-600'>Email</p>
                <p className='font-medium'>{currentUser.email}</p>
              </div>
              <div>
                <p className='text-sm text-gray-600'>Join Date</p>
                <p className='font-medium'>
                  {new Date(currentUser.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
        {/* Attendance Section */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>Mark your attendance for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {todayShift && (
                <div className='p-3 bg-blue-50 border border-blue-200 rounded'>
                  <p className='text-sm font-medium'>Today's Shift</p>
                  <p className='text-xs text-gray-600'>
                    {getShiftDetails(todayShift.shiftType)?.name} -{' '}
                    {getShiftDetails(todayShift.shiftType) &&
                      `${formatTime(
                        getShiftDetails(todayShift.shiftType)!.startTime
                      )} - ${formatTime(
                        getShiftDetails(todayShift.shiftType)!.endTime
                      )}`}
                  </p>
                </div>
              )}

              {todayAttendance ? (
                <div className='space-y-2'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Check In:</span>
                    <span className='font-medium'>
                      {todayAttendance.checkIn
                        ? formatTime(todayAttendance.checkIn)
                        : 'Not checked in'}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Check Out:</span>
                    <span className='font-medium'>
                      {todayAttendance.checkOut
                        ? formatTime(todayAttendance.checkOut)
                        : 'Not checked out'}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Status:</span>
                    <Badge
                      className={getStatusBadgeColor(todayAttendance.status)}
                    >
                      {todayAttendance.status}
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className='text-gray-600'>No attendance marked for today</p>
              )}

              <div className='flex gap-2'>
                <Dialog
                  open={isAttendanceModalOpen}
                  onOpenChange={setIsAttendanceModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setAttendanceAction('checkin')}
                      disabled={
                        todayAttendance?.checkIn !== null &&
                        todayAttendance?.checkIn !== undefined
                      }
                      className='flex-1'
                    >
                      Check In
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Mark Attendance</DialogTitle>
                      <DialogDescription>
                        Confirm your{' '}
                        {attendanceAction === 'checkin'
                          ? 'check in'
                          : 'check out'}{' '}
                        for today
                      </DialogDescription>
                    </DialogHeader>
                    <div className='py-4'>
                      <p className='text-center text-lg font-medium'>
                        Current Time: {formatTime(getCurrentTime())}
                      </p>
                    </div>
                    <DialogFooter>
                      <Button
                        variant='outline'
                        onClick={() => setIsAttendanceModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAttendance}>
                        Confirm{' '}
                        {attendanceAction === 'checkin'
                          ? 'Check In'
                          : 'Check Out'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  variant='outline'
                  onClick={() => {
                    setAttendanceAction('checkout');
                    setIsAttendanceModalOpen(true);
                  }}
                  disabled={
                    !todayAttendance?.checkIn ||
                    todayAttendance?.checkOut !== null
                  }
                  className='flex-1'
                >
                  Check Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Your performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-4'>
              <div className='text-center p-3 bg-green-50 rounded'>
                <p className='text-2xl font-bold text-green-600'>
                  {
                    attendanceRecords.filter((r) => r.status === 'Present')
                      .length
                  }
                </p>
                <p className='text-sm text-gray-600'>Days Present</p>
              </div>
              <div className='text-center p-3 bg-blue-50 rounded'>
                <p className='text-2xl font-bold text-blue-600'>
                  {userShifts.filter((s) => s.status === 'Scheduled').length}
                </p>
                <p className='text-sm text-gray-600'>Upcoming Shifts</p>
              </div>
              <div className='text-center p-3 bg-yellow-50 rounded'>
                <p className='text-2xl font-bold text-yellow-600'>
                  {leaveRequests.filter((l) => l.status === 'Pending').length}
                </p>
                <p className='text-sm text-gray-600'>Pending Leaves</p>
              </div>
              <div className='text-center p-3 bg-purple-50 rounded'>
                <p className='text-2xl font-bold text-purple-600'>
                  {attendanceRecords
                    .reduce((acc, r) => acc + r.workingHours, 0)
                    .toFixed(1)}
                </p>
                <p className='text-sm text-gray-600'>Total Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Shifts */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>My Shifts</CardTitle>
          <CardDescription>Your upcoming and recent shifts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b'>
                  <th className='text-left p-2'>Date</th>
                  <th className='text-left p-2'>Shift</th>
                  <th className='text-left p-2'>Time</th>
                  <th className='text-left p-2'>Status</th>
                </tr>
              </thead>
              <tbody>
                {userShifts.slice(0, 5).map((shift) => {
                  const shiftDetails = getShiftDetails(shift.shiftType);
                  return (
                    <tr key={shift.id} className='border-b hover:bg-gray-50'>
                      <td className='p-2'>
                        {new Date(shift.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className='p-2 font-medium'>{shiftDetails?.name}</td>
                      <td className='p-2'>
                        {shiftDetails &&
                          `${formatTime(shiftDetails.startTime)} - ${formatTime(
                            shiftDetails.endTime
                          )}`}
                      </td>
                      <td className='p-2'>
                        <Badge className={getStatusBadgeColor(shift.status)}>
                          {shift.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Attendance History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
            <CardDescription>Your attendance history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {attendanceRecords.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                  <Clock className='h-12 w-12 mx-auto mb-4 opacity-50' />
                  <p>No attendance records yet</p>
                  <p className='text-sm'>
                    Your attendance history will appear here once you start
                    checking in
                  </p>
                </div>
              ) : (
                attendanceRecords.slice(0, 5).map((record) => (
                  <div
                    key={record.id}
                    className='flex justify-between items-center p-3 border rounded'
                  >
                    <div>
                      <p className='font-medium'>
                        {new Date(record.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      <p className='text-sm text-gray-600'>
                        {record.checkIn ? formatTime(record.checkIn) : '--'} -{' '}
                        {record.checkOut ? formatTime(record.checkOut) : '--'}
                      </p>
                    </div>
                    <div className='text-right'>
                      <Badge className={getStatusBadgeColor(record.status)}>
                        {record.status}
                      </Badge>
                      <p className='text-sm text-gray-600 mt-1'>
                        {record.workingHours.toFixed(1)}h
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Leave Requests */}
        <Card>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <div>
                <CardTitle>Leave Requests</CardTitle>
                <CardDescription>Your leave applications</CardDescription>
              </div>
              <Dialog
                open={isLeaveModalOpen}
                onOpenChange={setIsLeaveModalOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    onClick={openNewLeaveModal}
                    className='flex items-center gap-2'
                  >
                    <Plus className='h-4 w-4' />
                    Apply Leave
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[500px]'>
                  <DialogHeader>
                    <DialogTitle>
                      {editingLeave ? 'Edit Leave Request' : 'Apply for Leave'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingLeave
                        ? 'Update your leave request details below.'
                        : 'Fill in the details for your leave request.'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className='space-y-4 py-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='startDate'>Start Date</Label>
                        <Input
                          id='startDate'
                          type='date'
                          value={leaveFormData.startDate}
                          onChange={(e) =>
                            setLeaveFormData((prev) => ({
                              ...prev,
                              startDate: e.target.value,
                            }))
                          }
                          min={today}
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='endDate'>End Date</Label>
                        <Input
                          id='endDate'
                          type='date'
                          value={leaveFormData.endDate}
                          onChange={(e) =>
                            setLeaveFormData((prev) => ({
                              ...prev,
                              endDate: e.target.value,
                            }))
                          }
                          min={leaveFormData.startDate || today}
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='leaveType'>Leave Type</Label>
                      <Select
                        value={leaveFormData.type}
                        onValueChange={(value: LeaveRequest['type']) =>
                          setLeaveFormData((prev) => ({ ...prev, type: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select leave type' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='Vacation'>Vacation</SelectItem>
                          <SelectItem value='Sick'>Sick Leave</SelectItem>
                          <SelectItem value='Personal'>Personal</SelectItem>
                          <SelectItem value='Emergency'>Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {leaveFormData.startDate && leaveFormData.endDate && (
                      <div className='p-3 bg-blue-50 border border-blue-200 rounded'>
                        <div className='flex items-center gap-2 text-blue-700'>
                          <Calendar className='h-4 w-4' />
                          <span className='text-sm font-medium'>
                            Duration:{' '}
                            {calculateLeaveDays(
                              leaveFormData.startDate,
                              leaveFormData.endDate
                            )}{' '}
                            day(s)
                          </span>
                        </div>
                      </div>
                    )}

                    <div className='space-y-2'>
                      <Label htmlFor='reason'>Reason</Label>
                      <Textarea
                        id='reason'
                        placeholder='Please provide a reason for your leave request...'
                        value={leaveFormData.reason}
                        onChange={(e) =>
                          setLeaveFormData((prev) => ({
                            ...prev,
                            reason: e.target.value,
                          }))
                        }
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant='outline'
                      onClick={() => setIsLeaveModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleLeaveSubmit}
                      disabled={
                        !leaveFormData.startDate ||
                        !leaveFormData.endDate ||
                        !leaveFormData.reason.trim()
                      }
                    >
                      {editingLeave ? 'Update Request' : 'Submit Request'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {leaveRequests.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                  <Calendar className='h-12 w-12 mx-auto mb-4 opacity-50' />
                  <p>No leave requests yet</p>
                  <p className='text-sm'>
                    Click "Apply Leave" to submit your first request
                  </p>
                </div>
              ) : (
                leaveRequests.map((leave) => (
                  <div
                    key={leave.id}
                    className='p-4 border rounded-lg hover:shadow-sm transition-shadow'
                  >
                    <div className='flex justify-between items-start mb-3'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                          <p className='font-medium text-lg'>
                            {leave.type} Leave
                          </p>
                          <Badge className={getStatusBadgeColor(leave.status)}>
                            {leave.status}
                          </Badge>
                        </div>
                        <div className='flex items-center gap-4 text-sm text-gray-600 mb-2'>
                          <div className='flex items-center gap-1'>
                            <Calendar className='h-4 w-4' />
                            <span>
                              {new Date(leave.startDate).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                }
                              )}{' '}
                              -{' '}
                              {new Date(leave.endDate).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                }
                              )}
                            </span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Clock className='h-4 w-4' />
                            <span>
                              {calculateLeaveDays(
                                leave.startDate,
                                leave.endDate
                              )}{' '}
                              day(s)
                            </span>
                          </div>
                        </div>
                        <p className='text-sm text-gray-700 bg-gray-50 p-2 rounded'>
                          {leave.reason}
                        </p>
                        <p className='text-xs text-gray-500 mt-2'>
                          Applied on{' '}
                          {new Date(leave.appliedDate).toLocaleDateString()}
                        </p>
                      </div>

                      {leave.status === 'Pending' && (
                        <div className='flex gap-2 ml-4'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => handleEditLeave(leave)}
                            className='flex items-center gap-1'
                          >
                            <Edit className='h-3 w-3' />
                            Edit
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => handleCancelLeave(leave.id)}
                            className='flex items-center gap-1 text-red-600 hover:text-red-700 hover:border-red-300'
                          >
                            <X className='h-3 w-3' />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
