import React, { useState } from 'react';
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
                  {editingStaff ? 'Update Staff Member' : 'Add Staff Member'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className='h-10 w-10 rounded-full'
                      />
                      <div>
                        <div className='font-medium'>{member.name}</div>
                        <div className='text-sm text-gray-500'>
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='text-gray-600'>{member.role}</TableCell>
                  <TableCell className='text-gray-600'>
                    {member.department}
                  </TableCell>
                  <TableCell className='text-gray-600'>
                    {member.phone}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(member.status)}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleEdit(member)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-red-600 hover:text-red-800'
                        onClick={() => handleDelete(member.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Total Staff</CardTitle>
            <CardDescription>
              {searchTerm || selectedDepartment !== 'all'
                ? 'Filtered results'
                : 'Total number of staff members'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold text-blue-600'>
              {filteredStaff.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active</CardTitle>
            <CardDescription>
              {searchTerm || selectedDepartment !== 'all'
                ? 'Active in filtered results'
                : 'Currently active staff members'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold text-green-600'>
              {filteredStaff.filter((s) => s.status === 'Active').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>On Leave</CardTitle>
            <CardDescription>
              {searchTerm || selectedDepartment !== 'all'
                ? 'On leave in filtered results'
                : 'Staff members currently on leave'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold text-yellow-600'>
              {filteredStaff.filter((s) => s.status === 'On Leave').length}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
