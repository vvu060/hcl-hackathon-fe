import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
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
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Edit, Trash2, Users, UserCheck, UserX, Building } from 'lucide-react';
import {
  PageHeaderSkeleton,
  TableSkeleton,
  StatCardSkeleton,
} from '../components/ui/skeleton';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  avatar: string;
  email: string;
  phone: string;
}

const staffMembers: StaffMember[] = [
  {
    id: '1',
    name: 'Dr. Amelia Harper',
    role: 'Cardiologist',
    department: 'Cardiology',
    status: 'Active',
    avatar: 'https://avatar.iran.liara.run/public/1',
    email: 'amelia.harper@hospital.com',
    phone: '+1 (555) 123-4567',
  },
  {
    id: '2',
    name: 'Ethan Bennett',
    role: 'Registered Nurse',
    department: 'Emergency',
    status: 'Active',
    avatar: 'https://avatar.iran.liara.run/public/2',
    email: 'ethan.bennett@hospital.com',
    phone: '+1 (555) 234-5678',
  },
  {
    id: '3',
    name: 'Olivia Carter',
    role: 'Nurse Practitioner',
    department: 'Pediatrics',
    status: 'Active',
    avatar: 'https://avatar.iran.liara.run/public/3',
    email: 'olivia.carter@hospital.com',
    phone: '+1 (555) 345-6789',
  },
  {
    id: '4',
    name: 'Dr. Liam Foster',
    role: 'Surgeon',
    department: 'Surgery',
    status: 'On Leave',
    avatar: 'https://avatar.iran.liara.run/public/4',
    email: 'liam.foster@hospital.com',
    phone: '+1 (555) 456-7890',
  },
  {
    id: '5',
    name: 'Sophia Evans',
    role: 'Registered Nurse',
    department: 'ICU',
    status: 'Active',
    avatar: 'https://avatar.iran.liara.run/public/5',
    email: 'sophia.evans@hospital.com',
    phone: '+1 (555) 567-8901',
  },
];

const departments = [
  'Cardiology',
  'Emergency',
  'Pediatrics',
  'Surgery',
  'ICU',
  'Neurology',
  'Oncology',
  'Radiology',
];

const roles = [
  'Doctor',
  'Cardiologist',
  'Surgeon',
  'Registered Nurse',
  'Nurse Practitioner',
  'Physician Assistant',
  'Medical Technician',
  'Radiologist',
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'On Leave':
      return 'warning';
    case 'Inactive':
      return 'destructive';
    default:
      return 'default';
  }
};

export const Staff: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [staffData, setStaffData] = useState<StaffMember[]>(staffMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    status: 'Active' as 'Active' | 'Inactive' | 'On Leave',
    email: '',
    phone: '',
  });

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // Simulate 1.8 second loading time

    return () => clearTimeout(timer);
  }, []);

  // Filter staff based on search term and department
  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone.includes(searchTerm);

    const matchesDepartment =
      selectedDepartment === 'all' ||
      staff.department.toLowerCase() === selectedDepartment.toLowerCase();

    return matchesSearch && matchesDepartment;
  });

  // Calculate statistics based on filtered data
  const totalStaff = filteredStaff.length;
  const activeStaff = filteredStaff.filter(
    (staff) => staff.status === 'Active'
  ).length;
  const onLeaveStaff = filteredStaff.filter(
    (staff) => staff.status === 'On Leave'
  ).length;
  const uniqueDepartments = new Set(
    filteredStaff.map((staff) => staff.department)
  ).size;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingStaff) {
      // Update existing staff member
      const updatedStaffMember: StaffMember = {
        ...editingStaff,
        ...formData,
      };

      setStaffData((prev) =>
        prev.map((staff) =>
          staff.id === editingStaff.id ? updatedStaffMember : staff
        )
      );
    } else {
      // Add new staff member
      const newStaffMember: StaffMember = {
        id: (staffData.length + 1).toString(),
        ...formData,
        avatar: `https://avatar.iran.liara.run/public/${staffData.length + 1}`,
      };

      setStaffData((prev) => [...prev, newStaffMember]);
    }

    // Reset form and close modal
    setFormData({
      name: '',
      role: '',
      department: '',
      status: 'Active',
      email: '',
      phone: '',
    });
    setEditingStaff(null);
    setIsModalOpen(false);
  };

  const handleEdit = (staff: StaffMember) => {
    setEditingStaff(staff);
    setFormData({
      name: staff.name,
      role: staff.role,
      department: staff.department,
      status: staff.status,
      email: staff.email,
      phone: staff.phone,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (staffId: string) => {
    setStaffData((prev) => prev.filter((staff) => staff.id !== staffId));
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      role: '',
      department: '',
      status: 'Active',
      email: '',
      phone: '',
    });
    setEditingStaff(null);
    setIsModalOpen(false);
  };

  const handleAddNew = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      role: '',
      department: '',
      status: 'Active',
      email: '',
      phone: '',
    });
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className='p-6'>
        <PageHeaderSkeleton />

        <div className='mb-6 flex justify-between items-center'>
          <div className='flex gap-4'>
            <div className='h-10 w-64 bg-gray-200 rounded animate-pulse'></div>
            <div className='h-10 w-48 bg-gray-200 rounded animate-pulse'></div>
          </div>
          <div className='h-10 w-32 bg-gray-200 rounded animate-pulse'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>

        <div className='bg-white rounded-lg border'>
          <TableSkeleton rows={5} columns={6} />
        </div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Staff Management</h1>
        <p className='text-gray-600'>
          Manage your healthcare staff and their information
        </p>
      </div>

      <div className='mb-6 flex justify-between items-center'>
        <div className='flex gap-4'>
          <Input
            type='text'
            placeholder='Search staff...'
            className='w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className='w-48'>
              <SelectValue placeholder='All Departments' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept.toLowerCase()}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>Add New Staff</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle>
                {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
              </DialogTitle>
              <DialogDescription>
                {editingStaff
                  ? 'Update the details for this staff member.'
                  : 'Enter the details for the new staff member. All fields are required.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-right'>
                    Name
                  </Label>
                  <Input
                    id='name'
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className='col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='role' className='text-right'>
                    Role
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleInputChange('role', value)}
                  >
                    <SelectTrigger className='col-span-3'>
                      <SelectValue placeholder='Select a role' />
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
                      <SelectValue placeholder='Select a department' />
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
                  <Label htmlFor='status' className='text-right'>
                    Status
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange(
                        'status',
                        value as 'Active' | 'Inactive' | 'On Leave'
                      )
                    }
                  >
                    <SelectTrigger className='col-span-3'>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Active'>Active</SelectItem>
                      <SelectItem value='Inactive'>Inactive</SelectItem>
                      <SelectItem value='On Leave'>On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='email' className='text-right'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className='col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='phone' className='text-right'>
                    Phone
                  </Label>
                  <Input
                    id='phone'
                    type='tel'
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className='col-span-3'
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type='button' variant='outline' onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type='submit'>
                  {editingStaff ? 'Update Staff' : 'Add Staff'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Staff
              {(searchTerm || selectedDepartment !== 'all') && ' (Filtered)'}
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalStaff}</div>
            <p className='text-xs text-muted-foreground'>
              {searchTerm || selectedDepartment !== 'all'
                ? `Showing filtered results`
                : `Total staff members`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Staff</CardTitle>
            <UserCheck className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{activeStaff}</div>
            <p className='text-xs text-muted-foreground'>Currently working</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>On Leave</CardTitle>
            <UserX className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{onLeaveStaff}</div>
            <p className='text-xs text-muted-foreground'>Staff on leave</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Departments</CardTitle>
            <Building className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{uniqueDepartments}</div>
            <p className='text-xs text-muted-foreground'>
              {searchTerm || selectedDepartment !== 'all'
                ? `In filtered results`
                : `Total departments`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
          <CardDescription>
            {searchTerm || selectedDepartment !== 'all'
              ? `Showing ${filteredStaff.length} filtered staff members`
              : `Manage your healthcare staff and their information`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className='font-medium'>
                    <div className='flex items-center gap-2'>
                      <img
                        src={staff.avatar}
                        alt={staff.name}
                        className='h-8 w-8 rounded-full'
                      />
                      <span>{staff.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        getStatusVariant(staff.status) as
                          | 'default'
                          | 'secondary'
                          | 'destructive'
                          | 'outline'
                          | 'success'
                          | 'warning'
                      }
                    >
                      {staff.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className='text-sm'>
                      <div>{staff.email}</div>
                      <div className='text-gray-500'>{staff.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleEdit(staff)}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleDelete(staff.id)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
