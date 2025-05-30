import React, { useState, useEffect } from 'react';
// Enhanced Staff Management with Mobile-First Design
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
import {
  Edit,
  Trash2,
  Users,
  UserCheck,
  UserX,
  Building,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  MoreVertical,
} from 'lucide-react';
import {
  PageHeaderSkeleton,
  TableSkeleton,
  StatCardSkeleton,
  CardSkeleton,
} from '../components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

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
  {
    id: '6',
    name: 'Dr. Michael Chen',
    role: 'Neurologist',
    department: 'Neurology',
    status: 'Active',
    avatar: 'https://avatar.iran.liara.run/public/6',
    email: 'michael.chen@hospital.com',
    phone: '+1 (555) 678-9012',
  },
  {
    id: '7',
    name: 'Sarah Johnson',
    role: 'Medical Technician',
    department: 'Radiology',
    status: 'Active',
    avatar: 'https://avatar.iran.liara.run/public/7',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 789-0123',
  },
  {
    id: '8',
    name: 'Dr. Emily Davis',
    role: 'Oncologist',
    department: 'Oncology',
    status: 'Inactive',
    avatar: 'https://avatar.iran.liara.run/public/8',
    email: 'emily.davis@hospital.com',
    phone: '+1 (555) 890-1234',
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
  'Neurologist',
  'Oncologist',
  'Registered Nurse',
  'Nurse Practitioner',
  'Physician Assistant',
  'Medical Technician',
  'Radiologist',
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'On Leave':
      return 'bg-yellow-100 text-yellow-800';
    case 'Inactive':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const Staff: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [staffData, setStaffData] = useState<StaffMember[]>(staffMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
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
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter staff based on search term, department, and status
  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone.includes(searchTerm);

    const matchesDepartment =
      selectedDepartment === 'all' ||
      staff.department.toLowerCase() === selectedDepartment.toLowerCase();

    const matchesStatus =
      selectedStatus === 'all' ||
      staff.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesDepartment && matchesStatus;
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
    resetForm();
  };

  const resetForm = () => {
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
      <div className='p-4 md:p-6 space-y-6'>
        <PageHeaderSkeleton />

        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex-1'>
            <div className='h-10 bg-gray-200 rounded animate-pulse'></div>
          </div>
          <div className='flex gap-2'>
            <div className='h-10 w-32 bg-gray-200 rounded animate-pulse'></div>
            <div className='h-10 w-32 bg-gray-200 rounded animate-pulse'></div>
          </div>
        </div>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>

        <CardSkeleton>
          <div className='block md:hidden space-y-4'>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className='h-24 bg-gray-200 rounded animate-pulse'
              ></div>
            ))}
          </div>
          <div className='hidden md:block'>
            <TableSkeleton rows={5} columns={6} />
          </div>
        </CardSkeleton>
      </div>
    );
  }

  return (
    <div className='p-4 md:p-6 space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
            Staff Management
          </h1>
          <p className='text-muted-foreground'>
            Manage your healthcare staff and their information
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className='w-full sm:w-auto'>
              <Plus className='h-4 w-4 mr-2' />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[500px] mx-4'>
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
                <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='sm:text-right'>
                    Name
                  </Label>
                  <Input
                    id='name'
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className='sm:col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
                  <Label htmlFor='role' className='sm:text-right'>
                    Role
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleInputChange('role', value)}
                  >
                    <SelectTrigger className='sm:col-span-3'>
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
                <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
                  <Label htmlFor='department' className='sm:text-right'>
                    Department
                  </Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      handleInputChange('department', value)
                    }
                  >
                    <SelectTrigger className='sm:col-span-3'>
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
                <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
                  <Label htmlFor='status' className='sm:text-right'>
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
                    <SelectTrigger className='sm:col-span-3'>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Active'>Active</SelectItem>
                      <SelectItem value='Inactive'>Inactive</SelectItem>
                      <SelectItem value='On Leave'>On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
                  <Label htmlFor='email' className='sm:text-right'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className='sm:col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
                  <Label htmlFor='phone' className='sm:text-right'>
                    Phone
                  </Label>
                  <Input
                    id='phone'
                    type='tel'
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className='sm:col-span-3'
                    required
                  />
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
                  {editingStaff ? 'Update Staff' : 'Add Staff'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            type='text'
            placeholder='Search staff members...'
            className='pl-10'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='flex gap-2'>
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className='w-full sm:w-[160px]'>
              <Filter className='h-4 w-4 mr-2' />
              <SelectValue placeholder='Department' />
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
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className='w-full sm:w-[140px]'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Status</SelectItem>
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='on leave'>On Leave</SelectItem>
              <SelectItem value='inactive'>Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Staff</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalStaff}</div>
            <p className='text-xs text-muted-foreground'>
              {searchTerm ||
              selectedDepartment !== 'all' ||
              selectedStatus !== 'all'
                ? 'Filtered results'
                : 'Total members'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active</CardTitle>
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
            <p className='text-xs text-muted-foreground'>Active departments</p>
          </CardContent>
        </Card>
      </div>

      {/* Staff List */}
      <Card>
        <CardHeader>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <CardTitle>Staff Members</CardTitle>
              <CardDescription>
                {searchTerm ||
                selectedDepartment !== 'all' ||
                selectedStatus !== 'all'
                  ? `Showing ${filteredStaff.length} filtered staff members`
                  : `Manage your healthcare staff and their information`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Mobile Card View */}
          <div className='block md:hidden space-y-4'>
            {filteredStaff.map((staff) => (
              <Card key={staff.id} className='p-4'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-center gap-3 flex-1'>
                    <img
                      src={staff.avatar}
                      alt={staff.name}
                      className='h-12 w-12 rounded-full object-cover'
                    />
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-semibold text-sm truncate'>
                        {staff.name}
                      </h3>
                      <p className='text-sm text-muted-foreground truncate'>
                        {staff.role}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {staff.department}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Badge className={getStatusColor(staff.status)}>
                      {staff.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='sm'>
                          <MoreVertical className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem onClick={() => handleEdit(staff)}>
                          <Edit className='h-4 w-4 mr-2' />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(staff.id)}
                          className='text-red-600'
                        >
                          <Trash2 className='h-4 w-4 mr-2' />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className='mt-3 pt-3 border-t space-y-2'>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Mail className='h-4 w-4' />
                    <span className='truncate'>{staff.email}</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Phone className='h-4 w-4' />
                    <span>{staff.phone}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className='hidden md:block'>
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
                      <div className='flex items-center gap-3'>
                        <img
                          src={staff.avatar}
                          alt={staff.name}
                          className='h-10 w-10 rounded-full object-cover'
                        />
                        <span>{staff.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{staff.role}</TableCell>
                    <TableCell>{staff.department}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(staff.status)}>
                        {staff.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className='text-sm'>
                        <div className='flex items-center gap-1'>
                          <Mail className='h-3 w-3' />
                          {staff.email}
                        </div>
                        <div className='flex items-center gap-1 text-muted-foreground mt-1'>
                          <Phone className='h-3 w-3' />
                          {staff.phone}
                        </div>
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
          </div>

          {filteredStaff.length === 0 && (
            <div className='text-center py-8'>
              <Users className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
              <h3 className='text-lg font-semibold mb-2'>
                No staff members found
              </h3>
              <p className='text-muted-foreground mb-4'>
                {searchTerm ||
                selectedDepartment !== 'all' ||
                selectedStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by adding your first staff member.'}
              </p>
              {!(
                searchTerm ||
                selectedDepartment !== 'all' ||
                selectedStatus !== 'all'
              ) && (
                <Button onClick={handleAddNew}>
                  <Plus className='h-4 w-4 mr-2' />
                  Add First Staff Member
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
