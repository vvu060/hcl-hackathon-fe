import React, { useState, useEffect } from 'react';
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
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import {
  PageHeaderSkeleton,
  TableSkeleton,
  StatCardSkeleton,
  CardSkeleton,
} from '../components/ui/skeleton';

interface Shift {
  id: string;
  staffName: string;
  department: string;
  date: string;
  shiftType: string;
  role: string;
}

interface ShiftType {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  description: string;
}

interface ShiftRequest {
  id: string;
  staffName: string;
  requestType: 'change' | 'swap' | 'time-off';
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  reason: string;
}

// Staff members data for dropdown selection
interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
}

const departments = [
  'Emergency',
  'ICU',
  'Surgery',
  'Cardiology',
  'Pediatrics',
  'Neurology',
  'Oncology',
  'Radiology',
];

const roles = ['Doctor', 'Nurse', 'Surgeon', 'Technician', 'Administrator'];

// Predefined shift types
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

const initialShifts: Shift[] = [
  {
    id: '1',
    staffName: 'Dr. Amelia Harper',
    department: 'Cardiology',
    date: '2024-01-15',
    shiftType: '2', // Day Shift
    role: 'Doctor',
  },
  {
    id: '2',
    staffName: 'Ethan Bennett',
    department: 'Emergency',
    date: '2024-01-15',
    shiftType: '3', // Evening Shift
    role: 'Nurse',
  },
  {
    id: '3',
    staffName: 'Olivia Carter',
    department: 'Pediatrics',
    date: '2024-01-16',
    shiftType: '1', // Morning Shift
    role: 'Nurse',
  },
  {
    id: '4',
    staffName: 'Dr. Liam Foster',
    department: 'Surgery',
    date: '2024-01-17',
    shiftType: '5', // Extended Day
    role: 'Surgeon',
  },
  {
    id: '5',
    staffName: 'Sophia Evans',
    department: 'ICU',
    date: '2024-01-18',
    shiftType: '4', // Night Shift
    role: 'Nurse',
  },
];

const initialShiftRequests: ShiftRequest[] = [
  {
    id: '1',
    staffName: 'John Doe',
    requestType: 'change',
    status: 'pending',
    date: '2024-01-15',
    reason: 'Personal appointment',
  },
  {
    id: '2',
    staffName: 'Jane Smith',
    requestType: 'swap',
    status: 'pending',
    date: '2024-01-16',
    reason: 'Family emergency',
  },
  {
    id: '3',
    staffName: 'Mike Johnson',
    requestType: 'time-off',
    status: 'pending',
    date: '2024-01-17',
    reason: 'Vacation',
  },
  {
    id: '4',
    staffName: 'Sarah Wilson',
    requestType: 'change',
    status: 'approved',
    date: '2024-01-14',
    reason: 'Medical appointment',
  },
  {
    id: '5',
    staffName: 'Tom Brown',
    requestType: 'swap',
    status: 'approved',
    date: '2024-01-13',
    reason: 'Training session',
  },
];

// Staff members data for dropdown selection
const availableStaff: StaffMember[] = [
  {
    id: '1',
    name: 'Dr. Amelia Harper',
    role: 'Doctor',
    department: 'Cardiology',
    email: 'amelia.harper@hospital.com',
  },
  {
    id: '2',
    name: 'Ethan Bennett',
    role: 'Nurse',
    department: 'Emergency',
    email: 'ethan.bennett@hospital.com',
  },
  {
    id: '3',
    name: 'Olivia Carter',
    role: 'Nurse',
    department: 'Pediatrics',
    email: 'olivia.carter@hospital.com',
  },
  {
    id: '4',
    name: 'Dr. Liam Foster',
    role: 'Surgeon',
    department: 'Surgery',
    email: 'liam.foster@hospital.com',
  },
  {
    id: '5',
    name: 'Sophia Evans',
    role: 'Nurse',
    department: 'ICU',
    email: 'sophia.evans@hospital.com',
  },
  {
    id: '6',
    name: 'Dr. Michael Chen',
    role: 'Doctor',
    department: 'Neurology',
    email: 'michael.chen@hospital.com',
  },
  {
    id: '7',
    name: 'Sarah Johnson',
    role: 'Technician',
    department: 'Radiology',
    email: 'sarah.johnson@hospital.com',
  },
  {
    id: '8',
    name: 'Dr. Emily Davis',
    role: 'Doctor',
    department: 'Oncology',
    email: 'emily.davis@hospital.com',
  },
  {
    id: '9',
    name: 'James Wilson',
    role: 'Administrator',
    department: 'Emergency',
    email: 'james.wilson@hospital.com',
  },
  {
    id: '10',
    name: 'Lisa Brown',
    role: 'Nurse',
    department: 'Surgery',
    email: 'lisa.brown@hospital.com',
  },
];

export const Schedule: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [shiftRequests] = useState<ShiftRequest[]>(initialShiftRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [staffSearchTerm, setStaffSearchTerm] = useState('');
  const [showStaffDropdown, setShowStaffDropdown] = useState(false);
  const [formData, setFormData] = useState({
    staffName: '',
    department: '',
    date: '',
    shiftType: '',
    role: '',
  });

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate 2 second loading time

    return () => clearTimeout(timer);
  }, []);

  // Filter staff based on search term
  const filteredStaff = availableStaff.filter(
    (staff) =>
      staff.name.toLowerCase().includes(staffSearchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(staffSearchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(staffSearchTerm.toLowerCase())
  );

  // Helper function to get shift details
  const getShiftDetails = (shiftTypeId: string) => {
    return shiftTypes.find((shift) => shift.id === shiftTypeId);
  };

  // Helper function to get day name from date
  const getDayName = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Get current week dates
  const getCurrentWeekDates = (): string[] => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + 1); // Get Monday of current week

    const weekDates: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    }
    return weekDates;
  };

  // Calculate weekly overview dynamically for current week
  const currentWeekDates = getCurrentWeekDates();
  const weeklyOverview = currentWeekDates.map((date) => {
    const dayName = getDayName(date);
    const staffCount = shifts.filter((shift) => shift.date === date).length;
    return {
      day: dayName,
      date: date,
      staffCount: staffCount,
    };
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStaffSelect = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setStaffSearchTerm(staff.name);
    setFormData((prev) => ({
      ...prev,
      staffName: staff.name,
      department: staff.department,
      role: staff.role,
    }));
    setShowStaffDropdown(false);
  };

  const handleStaffSearchChange = (value: string) => {
    setStaffSearchTerm(value);
    setFormData((prev) => ({
      ...prev,
      staffName: value,
    }));
    setShowStaffDropdown(true);

    // Clear auto-filled fields if search doesn't match selected staff
    if (selectedStaff && value !== selectedStaff.name) {
      setSelectedStaff(null);
      setFormData((prev) => ({
        ...prev,
        department: '',
        role: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newShift: Shift = {
      id: (shifts.length + 1).toString(),
      ...formData,
    };

    setShifts((prev) => [...prev, newShift]);

    // Reset form
    setFormData({
      staffName: '',
      department: '',
      date: '',
      shiftType: '',
      role: '',
    });
    setSelectedStaff(null);
    setStaffSearchTerm('');
    setShowStaffDropdown(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      staffName: '',
      department: '',
      date: '',
      shiftType: '',
      role: '',
    });
    setSelectedStaff(null);
    setStaffSearchTerm('');
    setShowStaffDropdown(false);
    setIsModalOpen(false);
  };

  const pendingRequests = shiftRequests.filter(
    (req) => req.status === 'pending'
  );
  const approvedRequests = shiftRequests.filter(
    (req) => req.status === 'approved'
  );

  if (isLoading) {
    return (
      <div className='p-6'>
        <PageHeaderSkeleton />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>

        <div className='mt-8'>
          <CardSkeleton>
            <TableSkeleton rows={5} columns={5} />
          </CardSkeleton>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Schedule</h1>
        <p className='text-gray-600'>Manage staff schedules and shifts</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
            <CardDescription>Staff scheduled for each day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              {weeklyOverview.map(({ day, date, staffCount }) => (
                <div key={date} className='flex justify-between items-center'>
                  <div>
                    <span className='font-medium'>{day}</span>
                    <span className='text-sm text-gray-500 ml-2'>
                      {new Date(date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <Badge variant={staffCount > 0 ? 'default' : 'secondary'}>
                    {staffCount} staff scheduled
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage schedules and shifts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className='w-full'>Create New Shift</Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[500px]'>
                  <DialogHeader>
                    <DialogTitle>Create New Shift</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new shift assignment.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='staffName' className='text-right'>
                          Staff Name
                        </Label>
                        <div className='col-span-3 relative'>
                          <Input
                            id='staffName'
                            value={staffSearchTerm}
                            onChange={(e) =>
                              handleStaffSearchChange(e.target.value)
                            }
                            placeholder='Search for staff member...'
                            className='w-full'
                            onFocus={() => setShowStaffDropdown(true)}
                          />
                          {showStaffDropdown && filteredStaff.length > 0 && (
                            <div className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto'>
                              {filteredStaff.map((staff) => (
                                <div
                                  key={staff.id}
                                  className='px-4 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0'
                                  onClick={() => handleStaffSelect(staff)}
                                >
                                  <div className='font-medium'>
                                    {staff.name}
                                  </div>
                                  <div className='text-sm text-gray-600'>
                                    {staff.role} • {staff.department}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='department' className='text-right'>
                          Department
                        </Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) =>
                            handleInputChange('department', value)
                          }
                        >
                          <SelectTrigger className='col-span-3'>
                            <SelectValue placeholder='Select department' />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='role' className='text-right'>
                          Role
                        </Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) =>
                            handleInputChange('role', value)
                          }
                        >
                          <SelectTrigger className='col-span-3'>
                            <SelectValue placeholder='Select role' />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='date' className='text-right'>
                          Date
                        </Label>
                        <Input
                          id='date'
                          type='date'
                          value={formData.date}
                          onChange={(e) =>
                            handleInputChange('date', e.target.value)
                          }
                          className='col-span-3'
                          required
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='shiftType' className='text-right'>
                          Shift Type
                        </Label>
                        <Select
                          value={formData.shiftType}
                          onValueChange={(value) =>
                            handleInputChange('shiftType', value)
                          }
                        >
                          <SelectTrigger className='col-span-3'>
                            <SelectValue placeholder='Select shift type' />
                          </SelectTrigger>
                          <SelectContent>
                            {shiftTypes.map((shift) => (
                              <SelectItem key={shift.id} value={shift.id}>
                                {shift.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type='button'
                        variant='outline'
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button type='submit'>Create Shift</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant='outline' className='w-full'>
                View Calendar
              </Button>
              <Button variant='outline' className='w-full'>
                Export Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shift Requests</CardTitle>
            <CardDescription>Manage staff shift requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='p-3 bg-yellow-50 border border-yellow-200 rounded'>
                <p className='text-sm font-medium'>Pending Approval</p>
                <p className='text-xs text-gray-600'>
                  {pendingRequests.length} shift change requests
                </p>
              </div>
              <div className='p-3 bg-green-50 border border-green-200 rounded'>
                <p className='text-sm font-medium'>Approved</p>
                <p className='text-xs text-gray-600'>
                  {approvedRequests.length} requests this week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shifts Table */}
      <Card className='mt-8'>
        <CardHeader>
          <CardTitle>Current Shifts</CardTitle>
          <CardDescription>All scheduled shifts for this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b'>
                  <th className='text-left p-2'>Staff Name</th>
                  <th className='text-left p-2'>Department</th>
                  <th className='text-left p-2'>Role</th>
                  <th className='text-left p-2'>Date</th>
                  <th className='text-left p-2'>Shift</th>
                </tr>
              </thead>
              <tbody>
                {shifts.map((shift) => (
                  <tr key={shift.id} className='border-b hover:bg-gray-50'>
                    <td className='p-2 font-medium'>{shift.staffName}</td>
                    <td className='p-2'>{shift.department}</td>
                    <td className='p-2'>{shift.role}</td>
                    <td className='p-2'>
                      <div>
                        <div className='font-medium'>
                          {getDayName(shift.date)}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {new Date(shift.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </td>
                    <td className='p-2'>
                      <div>
                        <div className='font-medium'>
                          {getShiftDetails(shift.shiftType)?.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {getShiftDetails(shift.shiftType)?.startTime} -{' '}
                          {getShiftDetails(shift.shiftType)?.endTime}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
