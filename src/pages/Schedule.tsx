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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import {
  Calendar,
  Clock,
  Users,
  Plus,
  Download,
  Search,
  CalendarDays,
  UserCheck,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {
  PageHeaderSkeleton,
  TableSkeleton,
  StatCardSkeleton,
  CardSkeleton,
} from '../components/ui/skeleton';

// Enhanced Schedule Management Component
interface Shift {
  id: string;
  staffName: string;
  department: string;
  date: string;
  shiftType: string;
  role: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface ShiftType {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  description: string;
  color: string;
}

interface ShiftRequest {
  id: string;
  staffName: string;
  requestType: 'change' | 'swap' | 'time-off';
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  reason: string;
  submittedAt: string;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  avatar?: string;
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

const shiftTypes: ShiftType[] = [
  {
    id: '1',
    name: 'Morning Shift',
    startTime: '06:00',
    endTime: '14:00',
    description: '8-hour morning shift',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: '2',
    name: 'Day Shift',
    startTime: '08:00',
    endTime: '16:00',
    description: '8-hour day shift',
    color: 'bg-green-100 text-green-800',
  },
  {
    id: '3',
    name: 'Evening Shift',
    startTime: '14:00',
    endTime: '22:00',
    description: '8-hour evening shift',
    color: 'bg-orange-100 text-orange-800',
  },
  {
    id: '4',
    name: 'Night Shift',
    startTime: '22:00',
    endTime: '06:00',
    description: '8-hour night shift',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    id: '5',
    name: 'Extended Day',
    startTime: '07:00',
    endTime: '19:00',
    description: '12-hour day shift',
    color: 'bg-teal-100 text-teal-800',
  },
  {
    id: '6',
    name: 'Extended Night',
    startTime: '19:00',
    endTime: '07:00',
    description: '12-hour night shift',
    color: 'bg-indigo-100 text-indigo-800',
  },
];

const initialShifts: Shift[] = [
  {
    id: '1',
    staffName: 'Dr. Amelia Harper',
    department: 'Cardiology',
    date: '2024-01-15',
    shiftType: '2',
    role: 'Doctor',
    status: 'scheduled',
  },
  {
    id: '2',
    staffName: 'Ethan Bennett',
    department: 'Emergency',
    date: '2024-01-15',
    shiftType: '3',
    role: 'Nurse',
    status: 'scheduled',
  },
  {
    id: '3',
    staffName: 'Olivia Carter',
    department: 'Pediatrics',
    date: '2024-01-16',
    shiftType: '1',
    role: 'Nurse',
    status: 'completed',
  },
  {
    id: '4',
    staffName: 'Dr. Liam Foster',
    department: 'Surgery',
    date: '2024-01-17',
    shiftType: '5',
    role: 'Surgeon',
    status: 'scheduled',
  },
  {
    id: '5',
    staffName: 'Sophia Evans',
    department: 'ICU',
    date: '2024-01-18',
    shiftType: '4',
    role: 'Nurse',
    status: 'scheduled',
  },
  {
    id: '6',
    staffName: 'Dr. Michael Chen',
    department: 'Neurology',
    date: '2024-01-19',
    shiftType: '2',
    role: 'Doctor',
    status: 'scheduled',
  },
  {
    id: '7',
    staffName: 'Sarah Johnson',
    department: 'Radiology',
    date: '2024-01-20',
    shiftType: '1',
    role: 'Technician',
    status: 'scheduled',
  },
  {
    id: '8',
    staffName: 'Dr. Emily Davis',
    department: 'Oncology',
    date: '2024-01-21',
    shiftType: '3',
    role: 'Doctor',
    status: 'scheduled',
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
    submittedAt: '2024-01-10T10:30:00Z',
  },
  {
    id: '2',
    staffName: 'Jane Smith',
    requestType: 'swap',
    status: 'pending',
    date: '2024-01-16',
    reason: 'Family emergency',
    submittedAt: '2024-01-11T14:20:00Z',
  },
  {
    id: '3',
    staffName: 'Mike Johnson',
    requestType: 'time-off',
    status: 'approved',
    date: '2024-01-17',
    reason: 'Vacation',
    submittedAt: '2024-01-08T09:15:00Z',
  },
  {
    id: '4',
    staffName: 'Sarah Wilson',
    requestType: 'change',
    status: 'rejected',
    date: '2024-01-14',
    reason: 'Medical appointment',
    submittedAt: '2024-01-12T16:45:00Z',
  },
];

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
];

export const Schedule: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [shiftRequests, setShiftRequests] =
    useState<ShiftRequest[]>(initialShiftRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [staffSearchTerm, setStaffSearchTerm] = useState('');
  const [showStaffDropdown, setShowStaffDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formData, setFormData] = useState({
    staffName: '',
    department: '',
    date: '',
    shiftType: '',
    role: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredStaff = availableStaff.filter(
    (staff) =>
      staff.name.toLowerCase().includes(staffSearchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(staffSearchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(staffSearchTerm.toLowerCase())
  );

  const filteredShifts = shifts.filter((shift) => {
    const matchesSearch =
      shift.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === 'all' || shift.department === departmentFilter;
    const matchesStatus =
      statusFilter === 'all' || shift.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getShiftDetails = (shiftTypeId: string) => {
    return shiftTypes.find((shift) => shift.id === shiftTypeId);
  };

  const getDayName = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getCurrentWeekDates = (): string[] => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + 1);

    const weekDates: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date.toISOString().split('T')[0]);
    }
    return weekDates;
  };

  const currentWeekDates = getCurrentWeekDates();
  const weeklyOverview = currentWeekDates.map((date) => {
    const dayName = getDayName(date);
    const dayShifts = shifts.filter((shift) => shift.date === date);
    const staffCount = dayShifts.length;
    const completedCount = dayShifts.filter(
      (shift) => shift.status === 'completed'
    ).length;

    return {
      day: dayName,
      date: date,
      staffCount: staffCount,
      completedCount: completedCount,
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
      status: 'scheduled',
    };

    setShifts((prev) => [...prev, newShift]);
    resetForm();
  };

  const resetForm = () => {
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

  const handleRequestAction = (
    requestId: string,
    action: 'approve' | 'reject'
  ) => {
    setShiftRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: action === 'approve' ? 'approved' : 'rejected',
            }
          : request
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className='h-4 w-4 text-yellow-500' />;
      case 'approved':
        return <CheckCircle className='h-4 w-4 text-green-500' />;
      case 'rejected':
        return <XCircle className='h-4 w-4 text-red-500' />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant='default'>Scheduled</Badge>;
      case 'completed':
        return (
          <Badge variant='secondary' className='bg-green-100 text-green-800'>
            Completed
          </Badge>
        );
      case 'cancelled':
        return <Badge variant='destructive'>Cancelled</Badge>;
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  const pendingRequests = shiftRequests.filter(
    (req) => req.status === 'pending'
  );
  const totalStaff = shifts.length;
  const todayShifts = shifts.filter(
    (shift) => shift.date === new Date().toISOString().split('T')[0]
  ).length;

  if (isLoading) {
    return (
      <div className='p-6 space-y-6'>
        <PageHeaderSkeleton />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2'>
            <CardSkeleton>
              <TableSkeleton rows={8} columns={6} />
            </CardSkeleton>
          </div>
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Schedule Management
          </h1>
          <p className='text-muted-foreground'>
            Manage staff schedules, shifts, and requests
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm'>
            <Download className='h-4 w-4 mr-2' />
            Export
          </Button>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button size='sm'>
                <Plus className='h-4 w-4 mr-2' />
                New Shift
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[500px]'>
              <DialogHeader>
                <DialogTitle>Create New Shift</DialogTitle>
                <DialogDescription>
                  Schedule a new shift for a staff member.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='staffName' className='text-right'>
                      Staff Member
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
                        <div className='absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-y-auto'>
                          {filteredStaff.map((staff) => (
                            <div
                              key={staff.id}
                              className='px-4 py-2 hover:bg-accent cursor-pointer border-b last:border-b-0'
                              onClick={() => handleStaffSelect(staff)}
                            >
                              <div className='font-medium'>{staff.name}</div>
                              <div className='text-sm text-muted-foreground'>
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
                            <div className='flex items-center gap-2'>
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  shift.color.split(' ')[0]
                                }`}
                              />
                              {shift.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter className='flex-col sm:flex-row gap-2'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={resetForm}
                    className='w-full sm:w-auto'
                  >
                    Cancel
                  </Button>
                  <Button type='submit' className='w-full sm:w-auto'>
                    Create Shift
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Shifts</CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalStaff}</div>
            <p className='text-xs text-muted-foreground'>This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Today's Shifts
            </CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{todayShifts}</div>
            <p className='text-xs text-muted-foreground'>Currently scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Staff Members</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{availableStaff.length}</div>
            <p className='text-xs text-muted-foreground'>Available staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Pending Requests
            </CardTitle>
            <AlertCircle className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{pendingRequests.length}</div>
            <p className='text-xs text-muted-foreground'>Need approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Shifts Table */}
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                  <CardTitle>Current Shifts</CardTitle>
                  <CardDescription>Manage all scheduled shifts</CardDescription>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='relative'>
                    <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      placeholder='Search shifts...'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className='pl-8 w-[200px]'
                    />
                  </div>
                  <Select
                    value={departmentFilter}
                    onValueChange={setDepartmentFilter}
                  >
                    <SelectTrigger className='w-[140px]'>
                      <SelectValue placeholder='Department' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className='w-[120px]'>
                      <SelectValue placeholder='Status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Status</SelectItem>
                      <SelectItem value='scheduled'>Scheduled</SelectItem>
                      <SelectItem value='completed'>Completed</SelectItem>
                      <SelectItem value='cancelled'>Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShifts.map((shift) => {
                    const shiftDetails = getShiftDetails(shift.shiftType);
                    return (
                      <TableRow key={shift.id}>
                        <TableCell>
                          <div>
                            <div className='font-medium'>{shift.staffName}</div>
                            <div className='text-sm text-muted-foreground'>
                              {shift.role}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{shift.department}</TableCell>
                        <TableCell>
                          <div>
                            <div className='font-medium'>
                              {getDayName(shift.date)}
                            </div>
                            <div className='text-sm text-muted-foreground'>
                              {new Date(shift.date).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'short',
                                  day: 'numeric',
                                }
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center gap-2'>
                            <Badge className={shiftDetails?.color}>
                              {shiftDetails?.name}
                            </Badge>
                            <div className='text-sm text-muted-foreground'>
                              {shiftDetails?.startTime} -{' '}
                              {shiftDetails?.endTime}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(shift.status)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Weekly Overview */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <CalendarDays className='h-5 w-5' />
                Weekly Overview
              </CardTitle>
              <CardDescription>Staff scheduled for each day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {weeklyOverview.map(
                  ({ day, date, staffCount, completedCount }) => (
                    <div
                      key={date}
                      className='flex items-center justify-between p-3 rounded-lg border'
                    >
                      <div>
                        <div className='font-medium'>{day}</div>
                        <div className='text-sm text-muted-foreground'>
                          {new Date(date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                      <div className='text-right'>
                        <div className='font-medium'>{staffCount} shifts</div>
                        <div className='text-sm text-muted-foreground'>
                          {completedCount} completed
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Shift Requests */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <UserCheck className='h-5 w-5' />
                Shift Requests
              </CardTitle>
              <CardDescription>Manage staff requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='pending' className='w-full'>
                <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger value='pending'>Pending</TabsTrigger>
                  <TabsTrigger value='all'>All Requests</TabsTrigger>
                </TabsList>
                <TabsContent value='pending' className='space-y-3 mt-4'>
                  {pendingRequests.length === 0 ? (
                    <div className='text-center py-6 text-muted-foreground'>
                      No pending requests
                    </div>
                  ) : (
                    pendingRequests.map((request) => (
                      <div
                        key={request.id}
                        className='p-3 border rounded-lg space-y-2'
                      >
                        <div className='flex items-center justify-between'>
                          <div className='font-medium'>{request.staffName}</div>
                          <Badge variant='outline' className='text-xs'>
                            {request.requestType}
                          </Badge>
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          {request.reason}
                        </div>
                        <div className='text-xs text-muted-foreground'>
                          Date: {new Date(request.date).toLocaleDateString()}
                        </div>
                        <div className='flex gap-2 pt-2'>
                          <Button
                            size='sm'
                            variant='outline'
                            className='flex-1'
                            onClick={() =>
                              handleRequestAction(request.id, 'approve')
                            }
                          >
                            <CheckCircle className='h-3 w-3 mr-1' />
                            Approve
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            className='flex-1'
                            onClick={() =>
                              handleRequestAction(request.id, 'reject')
                            }
                          >
                            <XCircle className='h-3 w-3 mr-1' />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
                <TabsContent value='all' className='space-y-3 mt-4'>
                  {shiftRequests.map((request) => (
                    <div key={request.id} className='p-3 border rounded-lg'>
                      <div className='flex items-center justify-between mb-2'>
                        <div className='font-medium'>{request.staffName}</div>
                        <div className='flex items-center gap-2'>
                          {getStatusIcon(request.status)}
                          <Badge variant='outline' className='text-xs'>
                            {request.requestType}
                          </Badge>
                        </div>
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        {request.reason}
                      </div>
                      <div className='text-xs text-muted-foreground mt-1'>
                        {new Date(request.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
